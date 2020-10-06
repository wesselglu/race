class Render {
    constructor() {
      throw new Error("Class 'Render' should be used as a static Class. Do not instantiate!");
    }
    static polygon(ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.lineTo(x4, y4);
      ctx.closePath();
      ctx.fill();
    }
    static segment(ctx, width, lanes, x1, y1, w1, x2, y2, w2, fog, color) {
      const r1 = Render.rumbleWidth(w1, lanes);
      const r2 = Render.rumbleWidth(w2, lanes);
      const l1 = Render.laneMarkerWidth(w1, lanes);
      const l2 = Render.laneMarkerWidth(w2, lanes);
      ctx.fillStyle = color.grass;
      ctx.fillRect(0, y2, width, y1 - y2);
      Render.polygon(ctx, x1 - w1 - r1, y1, x1 - w1, y1, x2 - w2, y2, x2 - w2 - r2, y2, color.rumble);
      Render.polygon(ctx, x1 + w1 + r1, y1, x1 + w1, y1, x2 + w2, y2, x2 + w2 + r2, y2, color.rumble);
      Render.polygon(ctx, x1 - w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2, color.road);
      if (color.lane) {
        const lanew1 = (w1 * 2) / lanes;
        const lanew2 = (w2 * 2) / lanes;
        let lanex1 = x1 - w1 + lanew1;
        let lanex2 = x2 - w2 + lanew2;
        for (let lane = 1; lane < lanes; lanex1 += lanew1, lanex2 += lanew2, lane++) {
          Render.polygon(ctx, lanex1 - l1 / 2, y1, lanex1 + l1 / 2, y1, lanex2 + l2 / 2, y2, lanex2 - l2 / 2, y2, color.lane);
        }
      }
    }
   static fog(ctx, x, y, width, height, fog) {
      if (fog < 1) {
        ctx.globalAlpha = 1 - fog;
        ctx.fillStyle = COLORS.FOG;
        ctx.fillRect(x, y, width, height);
        ctx.globalAlpha = 1;
      }
    }
    static rumbleWidth(projectedRoadWidth, lanes) {
      return projectedRoadWidth / Math.max(6, 2 * lanes);
    }
    static laneMarkerWidth(projectedRoadWidth, lanes) {
      return projectedRoadWidth / Math.max(32, 8 * lanes);
    }
   }