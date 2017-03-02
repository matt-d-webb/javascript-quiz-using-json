(function() {

  // Constructor
  this.Quiz = function() {

    var defaults = {
        dataSource: './data/data.json',
        nextButtonId: ''
    }

    this.options = defaults;
  }

  // Public Methods
  Quiz.prototype.start = function() {

    const url = this.options.dataSource;

    fetchData.call(this, url)
      .then((data) => {
        console.log('DATA', data);
      }).catch((error) => {
        console.log('ERROR', error);
      });

  }

  // Private Methods
  function fetchData(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(xhr.response);
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.onerror = function () {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        };
        xhr.send();
      });
  }

  function renderTemplate(data) {

    return `<div>`;

  }

  function buildTemplate() {}

  function initializeEvents() {
    if (this.nextButton) {
      this.nextButton.addEventListener('click', this.next.bind(this));
    }
  }


  var quiz = new Quiz();

  quiz.start();

}());
