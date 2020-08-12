import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
 
import './body.html';
import './task.js';
 
Template.body.helpers({
    tasks() {
        // Show newest entries at the top
        return Tasks.find({}, { sort: { createdAt: -1 } });
      },
});
 
Template.body.events({
    'submit .new-entry'(event) {
      // Prevent default browser form submit
      event.preventDefault();
  
      // Get value from form element
      const target = event.target;
      const title = target.title.value;
      const date =  target.date.value;
      const content = target.content.value;
      const writtenby = target.writtenby.value;
  
      // Insert an entry into the collection
      Tasks.insert({
        title,
        date,
        content,
        writtenby,
        createdAt: new Date(), // current time
      });
  
      // Clear form
      target.title.value = '';
      target.date.value = '';
      target.content.value = '';
      target.writtenby.value = '';
    },
  });