/* jshint expr: true */
/* globals fixture */
describe('<paper-date-time-input> basic', function() {

  var input;

  before(function() {
    input = fixture('input1');
  });

  describe('when tapping date input', function() {

    before(function() {
      input.$$('paper-input.date').click();
    });

    it('should open dialog with paper-date-picker', function() {
      expect(input.$.dateDialog.opened).to.be['true'];
    });

  });

  describe('when tapping time input', function() {

    before(function() {
      input.$$('paper-input.time').click();
    });

    it('should open dialog with paper-time-picker', function() {
      expect(input.$.timeDialog.opened).to.be['true'];
    });

  });

  describe('when setting date in picker', function() {

    var date;

    before(function(done) {
      input.$$('paper-input').click();

      setTimeout(function() {
        date = new Date();
        input.$$('paper-date-picker').set('date', date);
        done();
      });
    });

    it('should set properties on paper-date-time-input', function() {
      expect(input.date).to.equal(date);
    });

  });

  describe('when setting time in picker', function() {

    before(function(done) {
      input.$$('paper-input').click();

      setTimeout(function() {
        input.$$('paper-time-picker').set('hour', 1);
        input.$$('paper-time-picker').set('minute', 2);
        input.$$('paper-time-picker').set('second', 3);

        setTimeout(function() {
          done();
        }, 50)
      });
    });

    it('should set properties on paper-date-time-input', function() {
      expect(input.hour).to.equal(1);
      expect(input.minute).to.equal(2);
      expect(input.second).to.equal(3);
      expect(input.time).to.equal('1:02:03 AM');
    });

    it('should add time to date', function() {
      expect(input.date.getHours()).to.equal(1);
      expect(input.date.getMinutes()).to.equal(2);
      expect(input.date.getSeconds()).to.equal(3);
    });

  });

});
