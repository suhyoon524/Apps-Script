function myFunction() {
  var form = FormApp.create('Fall 2022 Demo')
  
  var name = form.addTextItem();
  name.setTitle('Name')
      .setRequired(true);

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
      .requireSelectAtMostPerColumn(3)
      //.requireLimitOneResponsePerColumn()
      .build();
timetable.setValidation(timetableValidation);

  Logger.log('Published URL: ' + form.getPublishedUrl());
  Logger.log('Editor URL: ' + form.getEditUrl());
}
