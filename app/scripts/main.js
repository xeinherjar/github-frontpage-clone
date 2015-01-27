// orgs[], starred[], repos[], user{}

// Helper Functions

var date_parts = function(str) {
  var update = new Date(str);
  var d = Date.now();
  var month_abv = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
                   'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  var dp = {
    day:   update.getDay(),
    month_short: month_abv[update.getMonth()],
    month: update.getMonth() + 1,
    year:  update.getUTCFullYear(),
    ago_text: "",
    display: ""
  } 

  dp.display = "" + dp.month_short + " " + dp.day + ", " + dp.year; 
  var ago = function(dt) {
      var ago = "Updated ";
      var ms_per_day = 1000 * 60 * 60 * 24;
      var diff = ((Date.now() - dt) / ms_per_day);
      diff = Math.floor(diff);

      if (diff < 31) { return "Updated " + diff + " days ago"; }
      else if (diff < 365) { return "Updated " + diff + " months ago"; }
      else if (diff > 365) { 
        return "Updated on " + dt.display;
      }
  };


  dp.ago_text = ago(update);
  return dp;
};

// TEMPLATES

// use mustache symbols vs erb.
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

// header-avatar
var header_avatar = $('#header-avatar');
var header_avatar_template = $('#header-avatar-template').html();
var ha_template_function = _.template(header_avatar_template);
header_avatar.html(ha_template_function(user));


// user-card
var user_card = $('#user-card');
var user_card_template = $('#user-card-template').html();
var uc_template_function = _.template(user_card_template);
user.created_display = date_parts(user.created_at).display;
user_card.html(uc_template_function(user));


// user-details
var user_details = $('#user-details');
var user_details_template = $('#user-details-template').html();
var ud_template_function = _.template(user_details_template);
user_details.html(ud_template_function(user));

// user-stats
var user_stats = $('#user-stats');
var user_stats_template = $('#user-stats-template').html();
var us_template_function = _.template(user_stats_template);
var stats = {
  followers: user.followers,
  starred:   starred.length,
  following: user.following
};
user_stats.html(us_template_function(stats));

// user-orgs
var user_orgs = $('#user-orgs');
var user_orgs_template = $('#user-orgs-template').html();
var uo_template_function = _.template(user_orgs_template);
user_orgs.html(uo_template_function(orgs));


// user-repos
var user_repos = $('#user-repos');
var user_repos_template = $('#user-repos-template').html();
var ur_template_function = _.template(user_repos_template);
// Sort arry by pushed_at date.
var sorted_repos = _.sortBy(repos, function(r) { return r.pushed_at; });
// lodash sortBy aslways does asc, reverse to get desc
sorted_repos = sorted_repos.reverse();
user_repos.html(ur_template_function(sorted_repos));
