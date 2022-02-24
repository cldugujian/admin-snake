<template>
	<main id="scene">
        <table cellpadding="0" cellspacing="0" id="line">
            <tr v-for="item in scene">
                <td v-for="element in item"></td>
            </tr>
        </table>
        <ul id="spirit">
            <li v-for="( item,index ) in spirit" :style="{ top:item.top*unit+'rem',left:item.left*unit+'rem' }"></li>
        </ul>
        <span id="food" :style="{ top:food.top*unit+'rem',left:food.left*unit+'rem' }"></span>
	</main>
</template>

<script>
	export default {
		name: "LandingPage",
        data(){
			return{
				// 游戏区域横纵个多少格
                size:{
                	x:15,
                	y:25,
                },
				// 场景数组
				scene:[],
				// 方向
				direction:'',
				// 贪吃蛇
				spirit:[],
				// 单位0.2rem
				unit:0.2,
				// 游戏是否结束
				flag:true,
				// 游戏帧率
				interval:8,
				// 食物
                food:{},
            }
        },
        methods:{
			// 初始化
			init(){
				// 创建初始场景
				for( let i=0; i<this.size.y; i++ ){
					this.scene.push([]);
					for( let j=0; j<this.size.x; j++ ){
						this.scene[i].push({ top:i, left:j });
					}
				}
                // 创建初始贪吃蛇
				this.spirit = [
					{ left:7,top:12 },
					{ left:7,top:13 },
				];
				// 初始化方向
				this.direction = 'up';
				// 初始化食物
				this.food = { top:10, left:7 };
            },
	        // 键盘处理方向
	        keyBoardHandler(){
		        let _this = this;
		        // 上下左右键盘事件(tips:不可180度转弯)
		        document.onkeyup = function(e){
		        	// 判断按下了哪个键
                    if( e.key === 'ArrowLeft' || e.key === 'a' ){
	                    _this.direction !== 'right' && ( _this.direction = 'left' );
                    }else if( e.key === 'ArrowUp' || e.key === 'w' ){
	                    _this.direction !== 'down' && ( _this.direction = 'up' );
                    }else if( e.key === 'ArrowRight' || e.key === 'd' ){
	                    _this.direction !== 'left' && ( _this.direction = 'right' );
                    }else if( e.key === 'ArrowDown' || e.key === 's' ){
	                    _this.direction !== 'up' && ( _this.direction = 'down' );
                    }
		        };
	        },
            // 移动端触摸处理方向
            touchHandler(){
	            let _this = this;
	            let initPos = {};
	            let finalPos = {};
	            document.ontouchstart = function (e) {
	            	initPos = {
	            		x:e.changedTouches[0].pageX,
	            		y:e.changedTouches[0].pageY,
                    }
	            };
	            document.ontouchend = function (e) {
	            	e.preventDefault();
		            finalPos = {
			            x:e.changedTouches[0].pageX,
			            y:e.changedTouches[0].pageY,
                    };
		            if( finalPos.x - initPos.x > 0 && ( Math.abs(finalPos.x - initPos.x) > Math.abs(finalPos.y - initPos.y) ) ){
			            _this.direction !== 'left' && ( _this.direction = 'right' );
		            }else if( finalPos.x - initPos.x < 0 && ( Math.abs(finalPos.x - initPos.x) > Math.abs(finalPos.y - initPos.y) ) ){
			            _this.direction !== 'right' && ( _this.direction = 'left' );
		            }else if( finalPos.y - initPos.y < 0 && ( Math.abs(finalPos.x - initPos.x) < Math.abs(finalPos.y - initPos.y) ) ){
			            _this.direction !== 'down' && ( _this.direction = 'up' );
		            }else if( finalPos.y - initPos.y > 0 && ( Math.abs(finalPos.x - initPos.x) < Math.abs(finalPos.y - initPos.y) ) ){
			            _this.direction !== 'up' && ( _this.direction = 'down' );
		            }
	            };
            },
            // 创建一个随机数
	        random(range, base) {
		        return parseInt(Math.random() * range) + base;
	        },
            // 更新食物
            updateFood(){
				let _this = this;
				// 新建一个数组，用来存放 - 去重的部分
				let cacheArr = [];
                // 判断有没有重合
				for( let i=0; i<_this.scene.length; i++ ){
					for( let j=0; j<_this.scene[i].length; j++ ){
						_this.spirit.forEach(function (item,index) {
							if( (_this.scene[i][j].top !== item.top) || (_this.scene[i][j].left !== item.left)  ){
								if( index === _this.spirit.length-1 ){
									cacheArr.push(JSON.parse( JSON.stringify(_this.scene[i][j]) ));
								}
                            }
                        });
                    }
                }
				// 更新食物位置
				_this.food = JSON.parse( JSON.stringify( cacheArr[_this.random(cacheArr.length,0)] ) );
            },
            // 更新贪吃蛇
            updateSpirit(){
	            let spirit = this.spirit;
	            for( let i=spirit.length; i>0; i-- ){
		            if( i !== spirit.length ){
			            spirit[i].top = spirit[i-1].top;
			            spirit[i].left = spirit[i-1].left;
		            }
	            }
            },
            // 检测边缘
            checkBorder(){
				if( this.spirit[0].top < 0 || this.spirit[0].top > this.size.y-1 || this.spirit[0].left < 0 || this.spirit[0].left > this.size.x-1 ){
					this.flag = false;
					alert('很遗憾，游戏失败');
                }
            },
	        // 检测自身
	        checkSelf(){
		        let _this = this;
		        _this.spirit.forEach(function (item,index) {
			        if( index !== 0 && index !== _this.spirit.length-1 ){
				        if( _this.spirit[0].top === item.top && _this.spirit[0].left === item.left ){
					        _this.flag = false;
					        alert('很遗憾，游戏失败');
				        }
			        }
		        });
	        },
	        // 检测食物
	        checkFood(){
		        let spirit = this.spirit;
		        // 判断有没有吃到
		        if( spirit[0].top === this.food.top && spirit[0].left === this.food.left ){
			        // 添加蛇的长度
			        spirit.push( JSON.parse( JSON.stringify(this.food) ) );
			        // 更新食物
			        this.updateFood();
		        }
	        },
            // 更新方向
            updateDirection(){
	            let spirit = this.spirit;
	            // 判断方向
	            switch( this.direction ){
		            case 'up':
			            spirit[0].top --;
			            break;
		            case 'down':
			            spirit[0].top ++;
			            break;
		            case 'left':
			            spirit[0].left --;
			            break;
		            case 'right':
			            spirit[0].left ++;
			            break;
	            }
            },
	        // 游戏主逻辑
	        game(){
				// 更新贪吃蛇
		        this.updateSpirit();
		        // 更新方向
		        this.updateDirection();
		        // 检测食物
		        this.checkFood();
                // 检测边缘
                this.checkBorder();
		        // 检测自身
                this.checkSelf();
	        },
            // 游戏主循环
            loop(){
				let _this = this;
	            function time(){
		            if( _this.flag === true ){
		            	_this.game();
			            setTimeout(time,1000/_this.interval);
                    }else{
		            	console.log('很遗憾，游戏失败!');
                    }
	            }
	            setTimeout( time,1000/_this.interval );
            },
        },
	    mounted() {
		    this.init();
		    this.keyBoardHandler();
		    this.touchHandler();
		    this.loop();
	    },
	}
</script>