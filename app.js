(function() {
  var model = {
    streamers: ["freecodecamp", "Sabre_AP", "MissMiaRose", "prawnn", "itshafu", "MissPetrai", "cchristiee", "middleditch", "MedryBW", "s1mpleof", "rxysurfchic", "lucyyfurr", "tsm_theoddone", "kaceytron", "trick2g"],
    api_url: 'https://api.twitch.tv/kraken/'
  };

  var controller = {
    init: function() {
      twitchView.init();
    },
    getStreamers: function() {
      return model.streamers;
    }

  };
		

  var twitchView = {
    init: function() {
		
	  this.console = $(document).find('div.console-wrap');
		
      this.streamers_container = $(this.console).find('div.console-streamers-container');

      this.streamers = controller.getStreamers();

      this.render();
    },
    render: function() {
      var streamer_contain = this.streamers_container,
        streamers = this.streamers;
		
	 streamers.forEach(function(user){
		 $.ajax({
				 method:'GET',
				 url: model.api_url + 'streams/' + user,
				 dataType: 'jsonp',
				 success:function(data){	 
				 console.log(data);
				 if(data.stream == null){
					//populate streamer container with streamer info
					 streamer_contain.append("<div class='console-streamer'><img class='console-streamer-img' src='http://4.bp.blogspot.com/-007YfLSpyrA/UMrBTl-H6zI/AAAAAAABPDE/WoBOEDXkw5Y/s640/Sara-Underwood.jpg'><p>"
											+user+"<br>sleeping<p></div>"); 
				 }else{
					 //populate streamer container with streamer info
					 streamer_contain.append("<div class='console-streamer'><img class='console-streamer-img' src="+data.stream.channel.logo+"><p>"
												+data.stream.channel.name+"<br><i class='fa fa-user'></i> Playing "+data.stream.channel.game+"</p></div>"
				 							); 
				 }
        		} }); //end ajax call	
	 });

    }//end render

  };

  //initialize controller
  controller.init();

}());