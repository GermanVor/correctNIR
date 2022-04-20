export const formateDate = (time: number) => {
    const currentDate = new Date(time);

    return `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
};
