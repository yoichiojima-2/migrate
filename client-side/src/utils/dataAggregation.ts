/**
 * Utility functions for aggregating data
 */
import type { 
  HappinessRecord, 
  CostOfLivingRecord, 
  AggregatedHappinessItem, 
  AggregatedCostItem 
} from '../types';

/**
 * Aggregates happiness data across cities
 * @param data - The happiness data to aggregate
 * @returns Aggregated happiness data
 */
export function aggregateHappinessData(data: HappinessRecord[]): AggregatedHappinessItem[] {
  if (!data || data.length === 0) return [];

  // Group by feature
  const featureGroups: { [key: string]: HappinessRecord[] } = {};
  
  data.forEach(record => {
    if (!featureGroups[record.feature]) {
      featureGroups[record.feature] = [];
    }
    featureGroups[record.feature].push(record);
  });

  // Calculate aggregates for each feature
  return Object.keys(featureGroups).map(feature => {
    const records = featureGroups[feature];
    const referenceRecord = records.find(r => r.city === records[0].city);
    
    if (!referenceRecord) {
      return {
        feature,
        reference: 0,
        compared: 0,
        difference: 0
      };
    }

    // Calculate average of compared cities (excluding reference city)
    const comparedRecords = records.filter(r => r.city !== referenceRecord.city);
    const avgCompared = comparedRecords.length > 0
      ? comparedRecords.reduce((sum, r) => sum + r.value, 0) / comparedRecords.length
      : 0;

    return {
      feature,
      reference: referenceRecord.value,
      compared: avgCompared,
      difference: referenceRecord.value - avgCompared
    };
  });
}

/**
 * Aggregates cost of living data across cities
 * @param data - The cost of living data to aggregate
 * @returns Aggregated cost of living data
 */
export function aggregateCostData(data: CostOfLivingRecord[]): AggregatedCostItem[] {
  if (!data || data.length === 0) return [];

  // Group by feature
  const featureGroups: { [key: string]: CostOfLivingRecord[] } = {};
  
  data.forEach(record => {
    if (!featureGroups[record.feature]) {
      featureGroups[record.feature] = [];
    }
    featureGroups[record.feature].push(record);
  });

  // Calculate aggregates for each feature
  return Object.keys(featureGroups).map(feature => {
    const records = featureGroups[feature];
    const referenceRecord = records.find(r => r.city === records[0].city);
    
    if (!referenceRecord) {
      return {
        feature,
        reference: 0,
        compared: 0,
        diffRate: 0
      };
    }

    // Calculate average of compared cities (excluding reference city)
    const comparedRecords = records.filter(r => r.city !== referenceRecord.city);
    const avgCompared = comparedRecords.length > 0
      ? comparedRecords.reduce((sum, r) => sum + r.value, 0) / comparedRecords.length
      : 0;

    // Calculate average diff rate
    const avgDiffRate = comparedRecords.length > 0
      ? comparedRecords.reduce((sum, r) => sum + r.diff_rate, 0) / comparedRecords.length
      : 0;

    return {
      feature,
      reference: referenceRecord.value,
      compared: avgCompared,
      diffRate: avgDiffRate
    };
  });
}
