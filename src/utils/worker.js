// worker.js
const workercode = () => {

  this.onmessage = async function(e) { // without this, onmessage is not defined
    var url = e.data
    console.log('Message received from main script');
    var workerResult = 'Received from main: ' + (e.data);
    console.log('Posting message back to main script');

    const response = await fetch(url);
    const data = await response.json();


    this.postMessage(data); // here it's working without this
  }
};

let code = workercode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;
