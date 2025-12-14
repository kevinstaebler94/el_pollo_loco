class IntervalManager {
   constructor() {
      this.intervalPool = [];
   }

   createInterval(fn, interval) {
      const id = setInterval(fn, interval);
      this.intervalPool.push(id);
      return id;
   }

   stopAllIntervals() {
      this.intervalPool.forEach((id) => {
         clearInterval(id);
      });
      this.intervalPool = [];
   }
}
