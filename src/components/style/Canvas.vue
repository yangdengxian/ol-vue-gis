<template>
    <canvas id="canvas"></canvas>
  
</template>

<script>
    export default {
        name: 'Canvas',
        data() {
            return {
            }
        },
        props: {
        
        },
        mounted() {
            this.getArrow(10,10,150,50);
        },
        methods: {
            getArrow(startX, startY, finalX, finalY,theta=30,headlen=10,width=1,color="#000") {
                var idName = document.getElementById("canvas");
                var ctx = idName.getContext("2d");

                // 计算各角度和对应坐标
                var angle = Math.atan2(startY - finalY, startX - finalX) * 180 / Math.PI,
                    angle1 = (angle + theta) * Math.PI / 180,
                    angle2 = (angle - theta) * Math.PI / 180,
                    topX = headlen * Math.cos(angle1),
                    topY = headlen * Math.sin(angle1),
                    botX = headlen * Math.cos(angle2),
                    botY = headlen * Math.sin(angle2);
                ctx.save();
                var arrowX ,arrowY ;
                //绘制箭头
                ctx.beginPath();
                arrowX = finalX + topX;
                arrowY = finalY + topY;

                ctx.moveTo(arrowX, arrowY);
                ctx.lineTo(finalX, finalY);
                arrowX = finalX + botX;
                arrowY = finalY + botY;
                ctx.lineTo(arrowX, arrowY);
                ctx.strokeStyle = color;
                ctx.lineWidth = width;

                ctx.stroke();
                ctx.closePath();
                arrowX = startX - topX;
                arrowY = startY - topY;
                //绘制虚线
                ctx.beginPath();

                // ctx.setLineDash([20, 10,10,10]);//实线 去掉此句
                ctx.setLineDash([20, 10]);//实线 去掉此句

                ctx.moveTo(arrowX, arrowY);
                ctx.moveTo(startX, startY);
                ctx.lineTo(finalX, finalY);
                ctx.stroke();
                ctx.restore();
            }
        }
        
    }
</script>

<style scoped>
    #canvas {
        width: 100%;
        height:800px;
    }
</style>
