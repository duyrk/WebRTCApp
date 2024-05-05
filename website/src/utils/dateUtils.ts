import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

class DateUtils {
    public static getNow(): string {
        return dayjs().format("YYYY-MM-DD HH:mm:ss")
    }

    public static getToday(): string {
        return dayjs().format("YYYY-MM-DD")
    }

    public static getYesterday(): string {
        return dayjs().subtract(1, "days").format("YYYY-MM-DD")
    }

    public static getTomorrow(): string {
        return dayjs().add(1, "days").format("YYYY-MM-DD")
    }

    public static getAgos(date: Date): string {
        return dayjs(date).fromNow()
    }

    public static commonFormat(date: Date) {
        return dayjs(date).format("YYYY-MM-DD")
    }

    public static customFormat(date: Date, format: string) {
        return dayjs(date).format(format)
    }
}

export default DateUtils