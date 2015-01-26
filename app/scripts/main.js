// orgs[], starred[], repos[], user{}



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
