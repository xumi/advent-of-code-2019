import chalk    from 'chalk';
import readfile from 'fs-readfile-promise';

let [ , , targetDay, targetQuestion ]: Array<string | undefined> = process.argv;

if ( !targetDay || isNaN(parseInt(targetDay)) ) {
  console.log( chalk.red( 'Please specify a day' ) );
  process.exit( 1 );
}

const day: string         = targetDay.padStart( 2, '0' );
const folderPath: string  = `./src/${ day }`;

type DynamicImport = {
  default: Function
};

(async() => {
  let [ response1, response2 ]: Array<string | null> = [ null, null ];

  const buffer = await readfile(`${ folderPath }/input.txt`);
  const input: string = buffer.toString();


  if ( !targetQuestion || targetQuestion === '1' ) {
    try {
      const file1: DynamicImport = await import(`${ folderPath }/1`);
      response1 = file1.default( input );
    } catch (e) {}
  }
  if ( !targetQuestion || targetQuestion === '2' ) {
    try {
      const file2: DynamicImport = await import(`${ folderPath }/2`);
      response2 = file2.default( input );
    } catch (e) {}
  }

  if ( response1 || response2 ) {
    console.log( chalk.underline( `Day ${day}:` ) );

    if ( response1 ) {
      console.log( chalk.underline( 'Response 1:' ) );
      console.log( chalk.green( response1 ) );
    }

    if ( response2 ) {
      console.log();
      console.log( chalk.underline( 'Response 2:' ) );
      console.log( chalk.green( response2 ) );
    }
  }
})();
