/* jshint expr: true */
/* globals fixture */
describe('<paper-date-time-input> basic', function() {

  var input;

  describe('<paper-date-time-input> basic', function() {
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

    describe('when setting date in picker and confirming', function() {

      var date = new Date();

      before(function(done) {
        input.$$('paper-input').click();

        setTimeout(function() {
          input.$.dateDialog.querySelector('paper-button[dialog-confirm]').click();
          done();
        });
      });

      it('should set date fields on paper-date-time-input', function() {
        expect(input.date.getDate()).to.equal(date.getDate());
        expect(input.date.getMonth()).to.equal(date.getMonth());
        expect(input.date.getFullYear()).to.equal(date.getFullYear());
      });

    });

    describe('when setting time in picker and confirming', function() {

      before(function(done) {
        input.$$('paper-input').click();

        setTimeout(function() {
          input.$$('paper-time-picker').set('hour', 1);
          input.$$('paper-time-picker').set('minute', 2);
          input.$$('paper-time-picker').set('second', 3);
          input.$.timeDialog.querySelector('paper-button[dialog-confirm]').click();

          done();
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

    describe('when changing date in picker again', function() {

      var date = new Date(1999, 11, 31);

      before(function(done) {
        input.$$('paper-input').click();

        setTimeout(function() {
          input.$$('paper-date-picker').set('date', date);
          input.$.dateDialog.querySelector('paper-button[dialog-confirm]').click();
          done();
        });
      });

      it('should only set date fields, should not override time', function() {
        expect(input.date.getFullYear()).to.equal(1999);
        expect(input.date.getMonth()).to.equal(11);
        expect(input.date.getDate()).to.equal(31);
        expect(input.date.getHours()).to.equal(1);
        expect(input.date.getMinutes()).to.equal(2);
        expect(input.date.getSeconds()).to.equal(3);
      });

    });

  });

  describe('<paper-date-time-input> validations', function() {
    describe('required attribute', function() {

      before(function(done) {
        input = fixture('input2');

        setTimeout(function() {
          input.$$('paper-input').validate();
          done();
        });
      });

      it('should validate the input and set invalid to true', function() {
        expect(input.invalid).to.be['true'];
      });

    });
    describe('required and autoValidate attributes', function() {

      before(function(done) {
        input = fixture('input3');

        setTimeout(function() {
          input.$$('paper-input').click();
          input.$.dateDialog.querySelector('paper-button[dialog-confirm]').click();
          input.querySelectorAll('paper-input')[0].value = null;
          input.querySelectorAll('paper-input')[1].value = null;
          done();
        });
      });

      it('should auto-validate the input', function() {
        expect(input.invalid).to.be['true'];
      });

    });
  });
});
