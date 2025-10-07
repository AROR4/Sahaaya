

export default class UploadManager {
    constructor(strategy) {
      this.strategy = strategy; // dynamic strategy
    }
  
    setStrategy(strategy) {
      this.strategy = strategy;
    }
  
    async upload(file, options) {
      if (!this.strategy) {
        throw new Error("No upload strategy selected");
      }
      return this.strategy.upload(file, options);
    }
  }
  