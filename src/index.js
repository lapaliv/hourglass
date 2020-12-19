import {Hourglass} from 'src/Hourglass';

require('./extensions/DateExtension');
require('./extensions/TimeExtension');
require('./extensions/ConverterExtension');
require('./extensions/CompareExtension');
require('./extensions/HelpersExtension');

require('./extensions/PropertyExtension');

export default Hourglass;
export {Hourglass};
export {HourglassDiff} from 'src/HourlgassDiff'
