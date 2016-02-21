
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
 * @param
  {Object} authResult Authorization result.
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
  $('.jumbotron').siblings().hide();
  $('#header').show();
  $('.menu').show();
  $('#home').show();
  $('.foot').show();
  /* MENU BAR: Push the body and the nav over by 285px over */
  $('.icon-menu').click(function() {
    $('.menu').animate({
      left: "0px"
    }, 200);

    $('body').animate({
      left: "285px"
    }, 200);
  });

  /* MENU BAR: Then push them back */
  $('.icon-close').click(function() {
    $('.menu').animate({
      left: "-285px"
    }, 200);

    $('body').animate({
      left: "0px"
    }, 200);
  });

  /* dynamically updating jumbotron - home*/
  $(document).ready(function() {
    $('#home-link').click(function() {
        var currentView = $('.jumbotron').attr('id');
        $('.jumbotron').hide();
        $('#home').show();
        return false; // cancel the event
    });
  });

  /* dynamically updating jumbotron - flightDetails*/
  $(document).ready(function() {
    $('#flightDetails-link').click(function() {
        var currentView = $('.jumbotron').attr('id');
        $('.jumbotron').hide();
        $('#flightDetails').show();
        return false; // cancel the event
    });
  });

  /* dynamically updating jumbotron - accomodation*/
  $(document).ready(function() {
    $('#accomodation-link').click(function() {
        var currentView = $('.jumbotron').attr('id');
        $('.jumbotron').hide();
        $('#accomodation').show();
        return false; // cancel the event
    });
  });

  /* dynamically updating jumbotron - events*/
  $(document).ready(function() {
    $('#events-link').click(function() {
        var currentView = $('.jumbotron').attr('id');
        $('.jumbotron').hide();
        $('#events').show();
        return false; // cancel the event
    });
  });

  /* dynamically updating jumbotron - budget*/
  $(document).ready(function() {
    $('#budget-link').click(function() {
        var currentView = $('.jumbotron').attr('id');
        $('.jumbotron').hide();
        $('#budget').show();
        return false; // cancel the event
    });
  });

   /* updating budget list*/
  $('.submit').click(function() {
    var expenditure = $('#expenditure').val();
    var price = $('#price').val();
    console.log(expenditure);
    console.log(price);
    $('<li class="list-group-item">').text(expenditure+" : "+price).prependTo('#posts-expenditure');
    $('#expenditure').val('');
    $('#price').val('');
  });
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
    });
}

function flight_submit() {
    var from = document.getElementById('departureLocation').value;
    var to   = document.getElementById('arrivalLocation').value;
    var startTime = document.getElementById('departureTime').value;
    var endTime   = document.getElementById('arrivalTime').value;
    var summary = from.concat(" to ");
    summary = summary.concat(to);
    endTime = endTime.concat(":00-06:00");
    startTime = startTime.concat(":00-06:00");
    gapi.client.load('Calendar', 'v3', function(){
        var event = {
            'summary': summary,
            'location': from,
            'description': 'flight from '.concat(summary), 
            'start': {
                'dateTime': startTime,
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': endTime,
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
    });
}

function accom_submit() {
    var summary = document.getElementById('AccomodationLocation').value;
    var startTime = document.getElementById('accomStart').value;
    var endTime = document.getElementById('accomEnd').value;
    endTime = endTime.concat(":00-06:00");
    startTime = startTime.concat(":00-06:00");
    gapi.client.load('Calendar', 'v3', function(){
        var event = {
            'summary': summary,
            'location': summary,
            'description': 'flight from '.concat(summary), 
            'start': {
                'dateTime': startTime,
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': endTime,
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
    });
}

function cal_submit(){
    console.log('test');
    var start = document.getElementById('cal_start').value;
    var end = document.getElementById('cal_end').value;
    console.log(start);
}


window.onload=function(){
    document.getElementById('submit').addEventListener('click', submit);
    document.getElementById('flight_submit').addEventListener('click', flight_submit);
    document.getElementById('accom_submit').addEventListener('click', accom_submit);
    document.getElementById('cal_submit').addEventListener('click', cal_submit);
}
$(document).ready(main);
