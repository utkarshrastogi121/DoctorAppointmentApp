export const formatDate = (date, config = {}) => {
    if (!date) return ''; 

    const defaultOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const options = { ...defaultOptions, ...config };

    const formattedDate = new Date(date);
    if (isNaN(formattedDate)) return '';

    return formattedDate.toLocaleDateString('en-US', options);
};
