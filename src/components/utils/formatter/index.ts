export namespace formatter {
  export const trimLongText = function (text: string, limit?: number): string {
    if (!limit) limit = 100
    return text.substring(0, Math.min((text.length, limit)))
  }
  export const formatDateTimeWIB = function (date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta', // Set the timezone to GMT+7 (WIB)
    }

    return date.toLocaleString('en-US', options) + ' WIB'
  }
  export const formatDate = function (date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }

    return date.toLocaleString('en-US', options)
  }
}
