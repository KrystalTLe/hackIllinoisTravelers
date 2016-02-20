
var CLIENT_ID = '152500545333-lqv4laenr9uai0nj9ftqnn8i6rhuj4tl.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar"];


/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
    gapi.auth.authorize(
            {
                'client_id': CLIENT_ID,
                'scope': SCOPES.join(' '),
                'immediate': true
            }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        gapi.client.load('calendar', 'v3');
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
    gapi.auth.authorize(
            {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
            handleAuthResult);
    return false;
}



var main = function() {
  /* Push the body and the nav over by 285px over */
  $('.icon-menu').click(function() {
    $('.menu').animate({
      left: "0px"
    }, 200);

    $('body').animate({
      left: "285px"
    }, 200);
  });

  /* Then push them back */
  $('.icon-close').click(function() {
    $('.menu').animate({
      left: "-285px"
    }, 200);

    $('body').animate({
      left: "0px"
    }, 200);
  });


  $('.post-btn').click(function() {
    var post = $('.status-box').val();
    $('<li>').text(post).prependTo('.posts');
    $('.status-box').val('');
    $('.counter').text('140');
    $('.post-btn').addClass('disabled'); 
  });
  
  $('.status-box').keyup(function() {
    var postLength = $(this).val().length;
    var charactersLeft = 140 - postLength;
    $('.counter').text(charactersLeft);
  
    if(charactersLeft < 0) {
      $('.post-btn').addClass('disabled'); 
    }
    else if(charactersLeft == 140) {
      $('.post-btn').addClass('disabled');
    }
    else {
      $('.post-btn').removeClass('disabled');
    }
  });
  
  //$('.post-btn').addClass('disabled');
};

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    console.log(textContent);
    //pre.appendChild(textContent);
}

function submit() {
    var summary = document.getElementById('summary').value;
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var description = document.getElementById('description').value;
    console.log(end);
    end = end.concat(":00-06:00");
    start = start.concat(":00-06:00");
    gapi.client.load('Calendar', 'v3', function(){
        var event = {
            'summary': summary,
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': description, 
            'start': {
                'dateTime': start,
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': end,
                'timeZone': 'America/Los_Angeles'
            },
            'reminders': {
                'useDefault': false,
                'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
                ]
            }
        };
        var request = gapi.client.calendar.events.insert({
            'calendarId': '7vgvgacpu311n50qdadt1il8r8@group.calendar.google.com',
            'resource': event
        });
        request.execute(function(event) {
            console.log('Event created: ' + event.htmlLink);

        });
        console.log('thets');
    });
}

$(document).ready(main);
window.onload=function(){
    document.getElementById('submit').addEventListener('click', submit);
}
