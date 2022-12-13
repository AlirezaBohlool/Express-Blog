const dateService = require("@service/dateservice")
const langService = require("@service/langservice")

class presentedPost {

    constructor(post){
        this.post = post
    }

    jalaliPer(){
      return langService.topersionNumber(dateService.dateparse(this.post.created_at));
    }
    

    langservice(){
      return langService.topersionNumber(dateService.dateparse(this.post.created_at));
    }
    
    expert(maxLength=20){
      const expertcontent =this.post.content.split(" ")
      return expertcontent.splice(0,maxLength-1).join(" ") + " ..."
    }

} 

module.exports = presentedPost