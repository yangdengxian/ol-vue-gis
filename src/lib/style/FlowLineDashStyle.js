import FlowLine from 'ol-ext/style/FlowLine';
import { ol_coordinate_dist2d } from 'ol-ext/geom/GeomUtils'
class FlowLineDashStyle extends FlowLine {
    constructor(options = {}) {
        super(options);
        this.arrowUrl = options.arrowUrl;
        this._lineDash = options.lineDash;
        this._map = options.map;
        this._zoomToNbs = {
            28: 800,
            27: 800,
            26: 800,
            25: 800,
            24: 800,
            23: 800,
            22: 800,
            21: 500,
            20: 250,
            19: 200,
            18: 90,
            17: 60,
            16: 30,
            15: 20,
            14: 15,
            13: 10,
            12: 5,
            11: 3,
            10: 2,
            9: 2,
            8: 2,
            7: 2,
            6: 2,
            5: 2,
            4: 2,
            3: 2,
            2: 2,
            1: 2,

        }
    }

    drawArrow(ctx, p0, p1, width, ratio) {
        var asize = this.getArrowSize()[0] * ratio;
        var l = ol_coordinate_dist2d(p0, p1);
        var dx = (p0[0] - p1[0]) / l;
        var dy = (p0[1] - p1[1]) / l;
        width = Math.max(this.getArrowSize()[1] / 2, width / 2) * ratio;
        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        ctx.lineTo(p0[0] - asize * dx + width * dy, p0[1] - asize * dy - width * dx);
        ctx.lineTo(p0[0] - asize * dx - width * dy, p0[1] - asize * dy + width * dx);
        ctx.lineTo(p0[0], p0[1]);
        ctx.fill();
    }

    _render(geom, e) {
        if (e.geometry.getType() === 'LineString' || e.geometry.getType() === 'MultiLineString') {
            var g, p, ctx = e.context;
            geom = e.geometry.getType() === 'LineString' ? geom : geom[0];
            // Get geometry used at drawing
            if (!this._visible) {
                var a = e.pixelRatio / e.resolution;
                var cos = Math.cos(e.rotation)
                var sin = Math.sin(e.rotation)
                g = e.geometry.getType() === 'LineString' ? e.geometry.getCoordinates() : e.geometry.getCoordinates()[0];
                var dx = geom[0][0] - g[0][0] * a * cos - g[0][1] * a * sin;
                var dy = geom[0][1] - g[0][0] * a * sin + g[0][1] * a * cos;
                geom = [];
                g.forEach((v, i) => {
                    p = v;
                    geom[i] = [
                        dx + p[0] * a * cos + p[1] * a * sin,
                        dy + p[0] * a * sin - p[1] * a * cos,
                        p[2]
                    ];
                })
            }

            var asize = this.getArrowSize()[0] * e.pixelRatio;

            ctx.save();
            // Offsets
            if (this.getOffset(0)) this._splitAsize(geom, this.getOffset(0) * e.pixelRatio)
            if (this.getOffset(1)) this._splitAsize(geom, this.getOffset(1) * e.pixelRatio, true)

            // Split into
            var nb = 20;
            var geoms = this._splitInto(geom, this._zoomToNbs[Math.round(this._map.getView().getZoom())] || 30, 2);
            var k = 0;
            nb = geoms.length;

            // Draw
            ctx.lineJoin = 'round';
            ctx.lineCap = this._lineCap || 'butt';
            if (geoms.length > 1) {
                for (k = 0; k < geoms.length; k++) {
                    var step = k / nb;
                    g = geoms[k];
                    ctx.lineWidth = this.getWidth(e.feature, step) * e.pixelRatio;
                    ctx.beginPath();
                    ctx.moveTo(g[0][0], g[0][1]);
                    //奇数项起点绘制箭头
                    if (!(k % 2)) {
                        // Arrow -1,2
                        if ((this.getArrow() === -1 || this.getArrow() === 2)) {
                            p = this._splitAsize(g, asize);
                            if (this._acolor) ctx.fillStyle = this._acolor;
                            else ctx.fillStyle = this.getColor(e.feature, 0);
                            this.drawArrow(ctx, p[0], p[1], this.getWidth(e.feature, 0), e.pixelRatio);
                        }
                        // Arrow 1 
                        if (this.getArrow() > 0) {
                            p = this._splitAsize(g, asize, true);
                            if (this._acolor) ctx.fillStyle = this._acolor;
                            else ctx.fillStyle = this.getColor(e.feature, 1);
                            this.drawArrow(ctx, p[0], p[1], this.getWidth(e.feature, 1), e.pixelRatio);
                        }

                        if (!this.getArrow()) {
                            g.forEach((v) => {
                                p = v;
                                ctx.lineTo(p[0], p[1]);
                            });
                            if (this._lineDash) {
                                ctx.setLineDash(this._lineDash)
                                ctx.strokeStyle = this.getColor(e.feature, step);
                            }
                            ctx.stroke();
                        }
                    }

                }
            }
            ctx.restore();
        }
    }

    createDashArrowLine(startX, startY, finalX, finalY, renderEvent, theta = 30, headlen = 10) {
        var ctx = renderEvent.context;
        // 计算各角度和对应坐标
        var angle = Math.atan2(startY - finalY, startX - finalX) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);
        ctx.save();
        var arrowX, arrowY;
        //绘制箭头
        ctx.beginPath();
        arrowX = finalX + topX;
        arrowY = finalY + topY;

        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(finalX, finalY);
        arrowX = finalX + botX;
        arrowY = finalY + botY;
        ctx.lineTo(arrowX, arrowY);
        ctx.strokeStyle = this.getColor(renderEvent.feature, 0);
        ctx.lineWidth = this.getWidth(renderEvent.feature, 1) * renderEvent.pixelRatio;

        ctx.stroke();
        ctx.closePath();
        arrowX = startX - topX;
        arrowY = startY - topY;
        //绘制虚线
        ctx.beginPath();

        // ctx.setLineDash([20, 10,10,10]);//实线 去掉此句
        ctx.setLineDash(this._lineDash); //实线 去掉此句

        ctx.moveTo(arrowX, arrowY);
        ctx.moveTo(startX, startY);
        ctx.lineTo(finalX, finalY);
        ctx.stroke();
        ctx.restore();
    }
}

export default FlowLineDashStyle;