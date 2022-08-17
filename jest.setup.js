var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-17-updated');

enzyme.configure({ adapter: new Adapter() });
