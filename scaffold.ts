import fs     from 'fs';
import chalk  from 'chalk';

let [ , , targetDay ]: Array<string | undefined> = process.argv;

if ( !targetDay || isNaN(parseInt(targetDay)) ) {
  console.log( chalk.red( 'Please specify a day' ) );
  process.exit( 1 );
}

const day: string         = targetDay.padStart( 2, '0' );
const folderPath: string  = `./src/${ day }`;

if ( fs.existsSync( folderPath ) ) {
  console.log( chalk.red( 'A folder for this day already exists!' ) );
  process.exit( 1 );
}

// Create Day folder
fs.mkdir( folderPath, (err) => {
  if (err) throw err;
} );

// Create Day input file
fs.writeFile( `${ folderPath }/input.txt`, '', (err) => {
  if (err) throw err;
} );

// Create file for question 1
fs.writeFile( `${ folderPath }/1.ts`, `export default (input: string): string => {
  return '';
}`, (err) => {
  if (err) throw err;
} );

// Create file for question 2
fs.writeFile( `${ folderPath }/2.ts`, `export default (input: string, previousTransformer: Function): string => {
  return '';
}`, (err) => {
  if (err) throw err;
} );
