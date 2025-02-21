import {
  AgeGroup,
  AgeGroupData,
  ReaderStats,
} from '@components/BookDetailPage/types';

export const transformDemographicsData = (
  bookStats: ReaderStats,
): AgeGroupData[] => {
  const ageGroups: AgeGroup[] = ['10s', '20s', '30s', '40s', '50s', '60plus'];

  const totalUsers =
    Object.values(bookStats.demographics.gender.male).reduce(
      (sum, count) => sum + count,
      0,
    ) +
    Object.values(bookStats.demographics.gender.female).reduce(
      (sum, count) => sum + count,
      0,
    ) +
    bookStats.demographics.gender.unknown;

  return ageGroups.map((age) => {
    const maleCount = bookStats.demographics.gender.male[age];
    const femaleCount = bookStats.demographics.gender.female[age];

    return {
      ageGroup: age,
      male: totalUsers ? (maleCount / totalUsers) * 100 : 0,
      female: totalUsers ? (femaleCount / totalUsers) * 100 : 0,
    };
  });
};
