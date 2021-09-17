import { useState, useEffect, useCallback } from 'react';

import * as styles from '../styles/PopupDatePicker.module.css';


import {Button, Popover, DatePicker} from '@shopify/polaris';


/**
 * A popup date picker to select a date
 * 
 * @param {str} buttonText the popover button display name
 * @param {Date} month the month looking at
 * @param {Date} year the year looking at
 * @param {Date} handleDateChange update the date selected
 * @param {Date} handleMonthChange update the month, year looking at
 * @param {Date} selectedDates the date selected
 * @param {Date} disableDatesAfter you cannot select dates after this
 */
function PopupDatePicker({buttonText, month, year, handleDateChange, handleMonthChange, selectedDates, disableDatesAfter})
{  
    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = useCallback(
      () => setPopoverActive((popoverActive) => !popoverActive),
      [],
    );

    const makeDisplayText = (text, date) => 
    {
        // JavaScript Date does not allow us to get the month via a method like getFullMonth(),
        // instead we can split its toString and choose the parts we want
        let dateSplit = date.toString().split(" ");
        return text + `${dateSplit[1]} ${dateSplit[2]} ${dateSplit[3]}`
    };

    const text = makeDisplayText(buttonText, selectedDates.start);

    const activator = (
        <Button onClick={togglePopoverActive} disclosure>
            {text}
        </Button>
      );
  
    return (
      <div className={styles.datepicker}>
        <Popover
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
          sectioned
        >
            <DatePicker
                month={month}
                year={year}
                onChange={handleDateChange}
                onMonthChange={handleMonthChange}
                selected={selectedDates}
                disableDatesAfter={disableDatesAfter}
            />
        </Popover>
      </div>
    );
}


export default PopupDatePicker