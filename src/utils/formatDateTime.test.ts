import { formatDateTime } from "./formatDateTime";

describe('formatDateTime', () => {
    it('should format a UTC timestamp to local timestamp' , () => {
        const timestamp = new Date('2024-08-25T19:00:00');
        const result = formatDateTime(timestamp);

        expect(result).toMatch('August 25, 2024 at 8:00:00 PM GMT+1');
    })

    it('should format and convert a UTC timestamp to a specified timezone' , () => {
        const timestamp = new Date('2024-08-25T19:00:00');
        const result = formatDateTime(timestamp, 'America/New_York'); // EDT

        expect(result).toMatch('August 25, 2024 at 3:00:00 PM EDT');
    })
})