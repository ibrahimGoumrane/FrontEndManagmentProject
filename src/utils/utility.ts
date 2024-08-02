export const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString(); // You can pass options to format the date
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Format time as HH:MM
    return `${formattedDate} at ${formattedTime}`;
  };
export const toDateTimeLocal = (dateString : string) => {
    const date = new Date(dateString);
    const ten = (i: number): string => (i < 10 ? "0" : "") + i;
    const YYYY = date.getFullYear();
    const MM = ten(date.getMonth() + 1);
    const DD = ten(date.getDate());
    const HH = ten(date.getHours());
    const II = ten(date.getMinutes());
    return `${YYYY}-${MM}-${DD}T${HH}:${II}`;
  };