'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

var PostGenerator = module.exports = function PostGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.metadata || (this.metadata = {});
  this.metadata.title = this.name;

  if (arguments[0] && arguments[0].length > 1) {
    this.metadata.authorname = arguments[0][1];
  }
  else {
    var fs = require("fs");
    var authors = fs.readdirSync('metadata/authors/');
    if (authors.length > 0)
      this.metadata.authorname = path.basename(authors[0], '.json')
  }

  if (!this.metadata.authorname)
    throw new Error('Can\'t found any author.');
}

util.inherits(PostGenerator, yeoman.generators.NamedBase);

PostGenerator.prototype.newPost = function newPost() {
  var postpath = 'content/posts/' + this.metadata.title.replace(/ /g, '-').toLowerCase();
  var date = new Date();
  this.metadata.createdate = [date.getFullYear(), date.getMonth(), date.getDate()].join('-')
    + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

  this.mkdir(postpath);
  this.template('index.md', postpath + '/index.md');

  console.log('Create new post at ' + postpath + ' by ' + this.metadata.authorname);
};
