function myFunction() {
    //var form = FormApp.create('Fall 2022 Demo')
  var form = FormApp.openById('1lLbtlw7AW3qd1ruTA9pJGwb3QgHkqFTV8jFcjRR7K3o')
                    .setDescription('Please indicate your scheduling preferences for the term listed above.  Your preferences will influence your schedule, but they are not the only (nor the highest priority) factor.  The schedule is largely created by a integer linear program, which will take your input literally.  If you leave 8:00 and 4:00 without X\'s, you will likely be teaching at both those times.Here is a fairly comprehensive list of the priorities of the ILP, in roughly the order of preference:\n\n1. Follow the UWSP standard block structure.\n2. Follow the STEM scheduling agreement for courses taken by other majors.\n3. No classes scheduled during department meeting times.\n4. No instructor scheduled for back-to-back-to-back classes. (Three in a row)\n5. No instructor scheduled for back-to-back in different buildings.\n6. Avoid conflicts among upper-level courses that may normally be taken in the same semester.\n7. Sections of the same course not offered at the same time (except, occasionally, when we want to do this).\n8. Your personal preferences.\n9. Courses that fill (109, 111, 112, 119, 225, 226, 209, 230, 255, 356) offered in larger rooms.  The list this applied to is in continual flux.');
  
  var image = UrlFetchApp.fetch('https://dcstatic.library.wisc.edu/Collections/images/UWSPAbout_logoNew.jpg');
  form.addImageItem()
      .setTitle('UWSP')
      .setHelpText('UWSP Logo')
      .setImage(image);
      
  var name = form.addTextItem();
  name.setTitle('Name')
      .setRequired(true);
  
  var nameValidation = FormApp.createTextValidation()
      .setHelpText("Please enter your name.")
      .build();
  name.setValidation(nameValidation);

  var note = form.addParagraphTextItem();
  note.setTitle('Special Notes')
      .setHelpText('For example, "I only teach in the evenings."');

  var meeting = form.addParagraphTextItem();
  meeting.setTitle('Expected University-level committee meetings.')
      .setHelpText('Please provide name of meeting and day/time of meeting');

  var fourcrcourse = form.addMultipleChoiceItem();
  fourcrcourse.setTitle('Four-credit courses: do you like or dislike meeting four days in a row?')
      .setChoices([
        fourcrcourse.createChoice('Like four days in a row'),
        fourcrcourse.createChoice('Dislike four days in a row'),
        fourcrcourse.createChoice('Do not care')
        ]);
  
  var twosecourse = form.addMultipleChoiceItem();
  twosecourse.setTitle('Two sections of same course: how strongly do you want them on the same days of the week?')
        .setChoices([
          twosecourse.createChoice('Strongly want same days of week'),
          twosecourse.createChoice('Do not care')
        ]);
   
  form.addPageBreakItem()
      .setTitle('Spending Your Points');

  var penaltybacktoback = form.addTextItem();
  penaltybacktoback.setTitle('Penalty for back-to-back classes. The higher number of points you use, the more likely you will be to NOT have back-to-back blocks. So, 0 (or blank) means, "I do not care if I have back-to-backs," and 14 means, "I really do not want them." Fill in number of points assigned (0-14).');

  var rewardbacktoback = form.addTextItem();
  rewardbacktoback.setTitle('Reward for back-to-back classes. Large number means you really want back-to-backs. Note that it does not make sense to put positive points in both this and the previous question. Fill in number of points assigned (0-14).');

  var requestopenday = form.addCheckboxItem();
  requestopenday.setTitle('I prefer to have an open day. Note that this will not work if you are teaching a 5-credit course.')
                .setChoices([
                  requestopenday.createChoice('Request open day (2pts).')
                ]);
  var acceptabledays = form.addTextItem();
  acceptabledays.setTitle('If you requested an open day, what are the acceptable days? (More options means more likely possible.)');

  var timetable  = form.addCheckboxGridItem()
      .setTitle('I prefer not to teach during the following times. Each box checked costs 1 point and indicates an undesirable time for you. You may only select three or fewer hours per day.')
      .setRows(['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'])
      .setColumns(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);

  var timetableValidation = FormApp.createCheckboxGridValidation()
      .setHelpText("You may only select three or fewer hours per day.")
      .requireLimitOneResponsePerColumn()
      .build();
timetable.setValidation(timetableValidation);

  Logger.log('Published URL: ' + form.getPublishedUrl());
  Logger.log('Editor URL: ' + form.getEditUrl());
}
