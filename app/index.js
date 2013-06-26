'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var crypto = require('crypto');

var BlacksmithGenerator = module.exports = function BlacksmithGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.authorname = 'blacksmith';
  this.metadata = {};
  this.testFramework = undefined;

  this.hookFor('blacksmith:post', {
    args: ['Hello World']
  });

  this.on('end', function () {
      this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BlacksmithGenerator, yeoman.generators.Base);

BlacksmithGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [
    {
        name: 'authorname',
        message: 'What is an author name',
        default: this.authorname
    },
    {
        type: 'confirm',
        name: 'globally',
        message: 'Would you like to use author name to globally(gmail, github, twitter)',
        default: true
    },
    {
        type: 'confirm',
        name: 'userinfo',
        message: 'Would you like to set more user information',
        default: false
    },
    {
        when: function( answers ) {return answers.userinfo},
        name: 'location',
        message: '\tLocation (ex: San Francisco, CA)',
        default: ''
    },
    {
        when: function( answers ) {return answers.userinfo},
        name: 'bio',
        message: '\tBio',
        default: ''
    }
  ];

  this.prompt(prompts, function (props) {
    this.metadata.appname = props.appname;
    this.metadata.authorname = props.authorname;

    if (props.globally) {
      this.metadata.email = this.metadata.authorname + '@gmail.com';
      this.metadata.github = this.metadata.authorname;
      this.metadata.twitter = this.metadata.authorname;
      this.metadata.gravatar = crypto.createHash('md5').update(this.metadata.email).digest('hex');
    }

    this.metadata.location = props.location;
    this.metadata.bio = props.bio;

    cb();
  }.bind(this));
};

BlacksmithGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

BlacksmithGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

BlacksmithGenerator.prototype.blacksmith = function projectfiles() {
  this.copy('blacksmith', '.blacksmith');
  this.directory('layouts');
  this.directory('pages');
  this.directory('partials');
  this.directory('public');
  this.mkdir('content/posts');
  this.mkdir('metadata/authors');
  this.template('author.json', 'metadata/authors/' + this.metadata.authorname.replace(' ', '-').toLowerCase() + '.json');


};

BlacksmithGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_package.json', 'package.json');
    this.copy('editorconfig', '.editorconfig');
};
