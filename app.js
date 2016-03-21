(function() {
  var model = {
    streamers: ["freecodecamp", "Sabre_AP", "MissMiaRose", "prawnn", "itshafu", "MissPetrai", "cchristiee", "middleditch", "MedryBW", "s1mpleof", "rxysurfchic", "lucyyfurr", "tsm_theoddone", "kaceytron", "trick2g"],
    api_url: 'https://api.twitch.tv/kraken/'
  };

  var controller = {
    init: function() {
      twitchButtonsView.init();
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
        //ajax api call
        function getTwitchData(path, user, callback) {
          $.ajax({
            method: 'GET',
            url: model.api_url + path + user,
            dataType: 'jsonp',
            success: callback
          });
        };

        streamers.forEach(function(user) {
          getTwitchData('streams/', user, function(data) {
            console.log(data);
            if (data.stream == null) {
              //if stream object is null, make a second api call to grab the streamers icons
              getTwitchData('users/', user, function(data) {
                //populate streamer container with streamer info
                streamer_contain.append("<a href='http://www.twitch.tv/" + user + "/profile' target='_blank'><div class='console-streamer' data-status='offline'><img class='console-streamer-img' src=" + data.logo + "><p>" + user + "<br><span class='console-streamer-game'>Offline</span><p></div></a>");
              });
            } else {
              //populate streamer container with streamer info
              streamer_contain.append("<a href='http://www.twitch.tv/" + user + "/profile' target='_blank'><div class='console-streamer' data-status='online'><img class='console-streamer-img' src=" + data.stream.channel.logo + "><p>" + data.stream.channel.name + "<br><span class='console-streamer-game'>" + data.stream.channel.game + "</span></p></div></a>");
            }
          });
        });

      } //end render

  };

  var twitchButtonsView = {
    init: function() {
      this.console = $(document).find('div.console-wrap');
      this.buttonList = $(this.console).find('ul.console-list li');
      this.render();
    },
    render: function() {
      var buttons = this.buttonList,
        console_container = this.console.find('div.console-streamers-container');
      //set the all btn to be active
      $(buttons[0]).addClass('active');

      buttons.each(function(index) {
        //bind the click event to the cuurent list item in the loop
        $(this).bind('click', {
          currentIndex: index
        }, function(event) {
          if (event.data.currentIndex === 0) {
            $(console_container).find('div.console-streamer[data-status=offline]').css('display', 'block');
            $(console_container).find('div.console-streamer[data-status=online]').css('display', 'block');
            $(buttons).removeClass('active');
            $(buttons[event.data.currentIndex]).addClass('active');
          } else if (event.data.currentIndex === 1) {
            $(console_container).find('div.console-streamer[data-status=offline]').css('display', 'none');
            $(console_container).find('div.console-streamer[data-status=online]').css('display', 'block');
            $(buttons).removeClass('active');
            $(buttons[event.data.currentIndex]).addClass('active');
          } else {
            $(console_container).find('div.console-streamer[data-status=online]').css('display', 'none');
            $(console_container).find('div.console-streamer[data-status=offline]').css('display', 'block');
            $(buttons).removeClass('active');
            $(buttons[event.data.currentIndex]).addClass('active');
          }
        });
      });
    }
  };

  //initialize controller
  controller.init();

}());