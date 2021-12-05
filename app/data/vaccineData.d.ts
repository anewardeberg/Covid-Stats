export type vaccineData = {
  country: string,
  timeline: [
    {
      total: number,
      daily: number,
      totalPerHundred: number,
      dailyPerMillion: number,
      date: Date
    }
  ]
}