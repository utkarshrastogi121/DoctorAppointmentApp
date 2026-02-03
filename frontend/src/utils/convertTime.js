const convertTime = (time) => {
    const [hourStr, minuteStr] = time.split(':');
    let hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    let meridiem = 'am';
    if (hours >= 12) {
        meridiem = 'pm';
        if (hours > 12) {
            hours -= 12;
        }
    }
    if (hours === 0) hours = 12; // handle midnight

    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + meridiem;
}

export default convertTime;
