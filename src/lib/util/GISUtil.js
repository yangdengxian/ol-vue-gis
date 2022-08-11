/* Douglas-Peuker算法：
在曲线首尾两点A，B之间连接一条直线AB，该直线为曲线的弦；
得到曲线上离该直线段距离最大的点C，计算其与AB的距离d；
比较该距离与预先给定的阈值threshold的大小，如果小于threshold，则该直线段作为曲线的近似，该段曲线处理完毕。
如果距离大于阈值，则用C将曲线分为两段AC和BC，并分别对两段取信进行1~3的处理。
当所有曲线都处理完毕时，依次连接各个分割点形成的折线，即可以作为曲线的近似。 */
/**
 * 
 * @param {*} point1 
 * @param {*} point2 
 * @returns 
 */
export function calculationDistance(point1, point2) {
    let lat1 = point1[1];
    let lat2 = point2[1];
    let lng1 = point1[0];
    let lng2 = point2[0];
    let radLat1 = lat1 * Math.PI / 180.0;
    let radLat2 = lat2 * Math.PI / 180.0;
    let a = radLat1 - radLat2;
    let b = (lng1 * Math.PI / 180.0) - (lng2 * Math.PI / 180.0);
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    return s * 6378137;
}

//计算垂距
export function distToSegment(start, end, center) {
    //下面用海伦公式计算面积
    let a = Math.abs(calculationDistance(start, end));
    let b = Math.abs(calculationDistance(start, center));
    let c = Math.abs(calculationDistance(end, center));
    let p = (a + b + c) / 2.0;
    let s = Math.sqrt(Math.abs(p * (p - a) * (p - b) * (p - c)));
    return s * 2.0 / a;
}

//递归方式压缩轨迹
export function compressLine(coordinate, result, start, end, dMax) {
    if (start < end) {
        let maxDist = 0;
        let currentIndex = 0;
        let startPoint = coordinate[start];
        let endPoint = coordinate[end];
        for (let i = start + 1; i < end; i++) {
            let currentDist = distToSegment(startPoint, endPoint, coordinate[i]);
            if (currentDist > maxDist) {
                maxDist = currentDist;
                currentIndex = i;
            }
        }
        if (maxDist >= dMax) {
            //将当前点加入到过滤数组中
            result.push(coordinate[currentIndex]);
            //将原来的线段以当前点为中心拆成两段，分别进行递归处理
            compressLine(coordinate, result, start, currentIndex, dMax);
            compressLine(coordinate, result, currentIndex, end, dMax);
        }
    }
    return result;
}
/**
 *
 *@param coordinate 原始轨迹Array<{latitude,longitude}>
 *@param dMax 允许最大距离误差
 *@return douglasResult 抽稀后的轨迹
 *
 */
export function douglasPeucker(coordinate, dMax) {
    if (!coordinate || !(coordinate.length > 2)) {
        return null;
    }
    let result = compressLine(coordinate, [], 0, coordinate.length - 1, dMax);
    result.push(coordinate[0]);
    result.push(coordinate[coordinate.length - 1]);
    let resultLatLng = result.sort((a, b) => {
        if (a.key < b.key) {
            return -1;
        } else if (a.key > b.key)
            return 1;
        return 0;
    });
    return resultLatLng;
}