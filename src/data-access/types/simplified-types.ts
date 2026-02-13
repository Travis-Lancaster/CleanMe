/**
 * Simplified API Types
 *
 * These types omit circular navigation properties to avoid TypeScript
 * "Type instantiation is excessively deep and possibly infinite" errors.
 *
 * Use these types for database operations and API calls instead of the
 * full types from data-contracts.ts
 */

import type {
	Assay as FullAssay,
	AssayBatch as FullAssayBatch,
	AssayElement as FullAssayElement,
	AssayLab as FullAssayLab,
	AssayLabElementAlias as FullAssayLabElementAlias,
	AssayLabMethod as FullAssayLabMethod,
	Collar as FullCollar,
	CollarCoordinate as FullCollarCoordinate,
	Company as FullCompany,
	CoreRecoveryRunLog as FullCoreRecoveryRunLog,
	DrillMethod as FullDrillMethod,
	DrillPattern as FullDrillPattern,
	DrillPlan as FullDrillPlan,
	DrillProgram as FullDrillProgram,
	FilteredSetParameter as FullFilteredSetParameter,
	Filteredset as FullFilteredset,
	FractureCountLog as FullFractureCountLog,
	GeologyCombinedLog as FullGeologyCombinedLog,
	Grid as FullGrid,
	Hole as FullHole,
	Instrument as FullInstrument,
	LoggingEvent as FullLoggingEvent,
	LoggingEventType as FullLoggingEventType,
	MapSheet as FullMapSheet,
	MapSurface as FullMapSurface,
	ParameterType as FullParameterType,
	Person as FullPerson,
	PickList as FullPickList,
	PickListUser as FullPickListUser,
	PickListValue as FullPickListValue,
	ProgramType as FullProgramType,
	PtGeologyLog as FullPtGeologyLog,
	PtLoggingEvent as FullPtLoggingEvent,
	PtMagSusLog as FullPtMagSusLog,
	PtMappingLog as FullPtMappingLog,
	QcClassification as FullQcClassification,
	QcFilteredset as FullQcFilteredset,
	QcGroup as FullQcGroup,
	QcInsertionRule as FullQcInsertionRule,
	QcInsertionRuleStandardSequence as FullQcInsertionRuleStandardSequence,
	QcReference as FullQcReference,
	QcReferenceType as FullQcReferenceType,
	QcReferenceValue as FullQcReferenceValue,
	QcRule as FullQcRule,
	QcType as FullQcType,
	ReportingType as FullReportingType,
	RowStatus as FullRowStatus,
	Sample as FullSample,
	Site as FullSite,
	SiteCoordinate as FullSiteCoordinate,
	StandardSample as FullStandardSample,
	Survey as FullSurvey,
	SurveyLog as FullSurveyLog,
	SurveyMethod as FullSurveyMethod,
	Tenement as FullTenement,
	Units as FullUnits,
	Xrf as FullXrf,
} from '../api/database/data-contracts';
// Grid - omit all navigation properties
export type Grid = Omit<FullGrid, 'collarCoordinates' | 'drillPlans' | 'samples' | 'siteCoordinates' | 'surveys' | 'surveyLogs'>;

// CollarCoordinate - omit navigation properties
export type CollarCoordinate = Omit<FullCollarCoordinate, 'collar' | 'gr' | 'rowStatus' | 'surveyCompany' | 'surveyMethod'>;

// Collar - omit navigation properties
export type Collar = Omit<FullCollar,
	'collarCoordinates' | 'collarType' | 'collars' | 'coreRecoveryRunLogs' |
	'drillMethods' | 'explorationCompany' | 'responsiblePerson' | 'responsiblePerson2' |
	'rowStatus' | 'loggingEventType'
>;

// CoreRecoveryRunLog - omit navigation properties
export type CoreRecoveryRunLog = Omit<FullCoreRecoveryRunLog,
	'collar' | 'coreDiameter' | 'loggedBy' | 'loggingEvent' | 'organization' | 'rowStatus'
>;

// FractureCountLog - omit navigation properties
export type FractureCountLog = Omit<FullFractureCountLog, 'alignment'>;

// GeologyCombinedLog - omit navigation properties
export type GeologyCombinedLog = Omit<FullGeologyCombinedLog, 'apy' | 'colour'>;

// Hole - omit navigation properties
export type Hole = Omit<FullHole, 'holeStatus' | 'holes' | 'holeNames'>;

// DrillPlan - omit navigation properties
export type DrillPlan = Omit<FullDrillPlan,
	'drillPattern' | 'drillPlans' | 'drillType' | 'holePurposeDetail' | 'zone'
>;

// DrillPattern - omit navigation properties
export type DrillPattern = Omit<FullDrillPattern,
	'drillPattern2' | 'drillPatternType' | 'drillProgram'
>;

// DrillProgram - omit navigation properties
export type DrillProgram = Omit<FullDrillProgram,
	'program' | 'programType' | 'rigType'
>;

// Survey - omit navigation properties
export type Survey = Omit<FullSurvey, 'gr'>;

// SurveyLog - omit navigation properties
export type SurveyLog = Omit<FullSurveyLog, 'gr'>;

// Site - omit navigation properties
export type Site = Omit<FullSite,
	'mapSheet' | 'programType' | 'siteAreaUnit' | 'siteType' | 'synchStatus' | 'terrain' | 'vegetation'
>;

// SiteCoordinate - omit navigation properties
export type SiteCoordinate = Omit<FullSiteCoordinate,
	'gr' | 'instrument' | 'site' | 'surveyMethod'
>;

// RowStatus - omit navigation properties
export type RowStatus = Omit<FullRowStatus,
	'collarCoordinates' | 'collars' | 'coreRecoveryRunLogs' | 'drillMethods'
>;

// Company - omit navigation properties
export type Company = Omit<FullCompany, 'collars'>;

// Person - omit navigation properties
export type Person = Omit<FullPerson, 'collars'>;

// LoggingEvent - omit navigation properties
export type LoggingEvent = Omit<FullLoggingEvent, 'coreRecoveryRunLogs' | 'loggingEventType'>;

// DrillMethod - omit navigation properties
export type DrillMethod = Omit<FullDrillMethod, 'rowStatus'>;

// Assay - omit navigation properties
export type Assay = Omit<FullAssay,
	'assayClassification' | 'batchNo' | 'element' | 'genericMethod' |
	'lab' | 'labElement' | 'originalMethod' | 'sample' | 'unit'
>;

// AssayBatch - omit navigation properties
export type AssayBatch = Omit<FullAssayBatch, 'assays' | 'batchStatus'>;

// AssayElement - omit navigation properties
export type AssayElement = Omit<FullAssayElement,
	'assayLabElementAliass' | 'elementGroup' | 'qcFilteredsets' | 'systemUnits'
>;

// AssayLab - omit navigation properties
export type AssayLab = Omit<FullAssayLab, 'qcFilteredsets' | 'qcInsertionRules'>;

// AssayLabElementAlias - omit navigation properties
export type AssayLabElementAlias = Omit<FullAssayLabElementAlias, 'assays' | 'element'>;

// AssayLabMethod - omit navigation properties
export type AssayLabMethod = Omit<FullAssayLabMethod,
	'assays' | 'chargeWeightUnit' | 'genericMethod'
>;

// Units - omit navigation properties
export type Units = Omit<FullUnits,
	'assayElements' | 'assayLabMethods' | 'assays' | 'casingSizes' |
	'parameterTypes' | 'qcReferenceValues' | 'reportingTypes' | 'sites'
>;

// QcFilteredset - omit navigation properties
export type QcFilteredset = Omit<FullQcFilteredset, 'element' | 'lab'>;

// QcReference - omit navigation properties
export type QcReference = Omit<FullQcReference, 'standardType'>;

// QcInsertionRule - omit navigation properties
export type QcInsertionRule = Omit<FullQcInsertionRule,
	'laboratory' | 'qcInsertionRuleStandardSequences'
>;

// QcInsertionRuleStandardSequence - omit navigation properties
export type QcInsertionRuleStandardSequence = Omit<FullQcInsertionRuleStandardSequence,
	'qcInsertionRule'
>;

// FilteredSetParameter - omit navigation properties
export type FilteredSetParameter = Omit<FullFilteredSetParameter,
	'conditionalParameterTypeCd' | 'filteredSet'
>;

// Filteredset - omit navigation properties
export type Filteredset = Omit<FullFilteredset, 'filteredSetParameters'>;

// ParameterType - omit navigation properties
export type ParameterType = Omit<FullParameterType, 'filteredSetParameters'>;

// PickList - omit navigation properties
export type PickList = Omit<FullPickList, 'pickListUsers' | 'pickListValues'>;

// PickListUser - omit navigation properties
export type PickListUser = Omit<FullPickListUser, 'pickList'>;

// PickListValue - omit navigation properties
export type PickListValue = Omit<FullPickListValue, 'pickList'>;

// Tenement - omit navigation properties
export type Tenement = Omit<FullTenement, 'costCd' | 'leaseStatus' | 'regStatus'>;

// ProgramType - omit navigation properties
export type ProgramType = Omit<FullProgramType, 'programCodes' | 'sites'>;

// QcClassification - omit navigation properties
export type QcClassification = Omit<FullQcClassification, 'qcGroup'>;

// QcGroup - omit navigation properties
export type QcGroup = Omit<FullQcGroup, 'qcClassifications'>;

// QcReferenceType - omit navigation properties
export type QcReferenceType = Omit<FullQcReferenceType, 'qcReferences'>;

// QcReferenceValue - omit navigation properties
export type QcReferenceValue = Omit<FullQcReferenceValue, 'units' | 'valueType'>;

// QcRule - omit navigation properties
export type QcRule = Omit<FullQcRule, 'qcType'>;

// QcType - omit navigation properties
export type QcType = Omit<FullQcType, 'qcRules'>;

// ReportingType - omit navigation properties
export type ReportingType = Omit<FullReportingType, 'unit'>;

// Instrument - omit navigation properties
export type Instrument = Omit<FullInstrument, 'ptMagSusLogs' | 'siteCoordinates'>;

// PtMagSusLog - omit navigation properties
export type PtMagSusLog = Omit<FullPtMagSusLog, 'instrument'>;

// PtLoggingEvent - omit navigation properties
export type PtLoggingEvent = Omit<FullPtLoggingEvent, 'loggingEventType'>;

// PtGeologyLog - omit navigation properties
export type PtGeologyLog = Omit<FullPtGeologyLog, 'weathering'>;

// PtMappingLog - omit navigation properties
export type PtMappingLog = Omit<FullPtMappingLog, 'mapSurface'>;

// LoggingEventType - omit navigation properties
export type LoggingEventType = Omit<FullLoggingEventType, 'loggingEvents' | 'ptLoggingEvents'>;

// MapSurface - omit navigation properties
export type MapSurface = Omit<FullMapSurface, 'ptMappingLogs'>;

// SurveyMethod - omit navigation properties
export type SurveyMethod = Omit<FullSurveyMethod, 'siteCoordinates'>;

// MapSheet - omit navigation properties
export type MapSheet = Omit<FullMapSheet, 'sites'>;

// Xrf - omit navigation properties
export type Xrf = Omit<FullXrf, 'unit'>;

// Sample - omit navigation properties
export type Sample = Omit<FullSample, 'assays' | 'sample'>;

// StandardSample - omit navigation properties
export type StandardSample = Omit<FullStandardSample, 'assayDispatchGroup' | 'standardSamples'>;

// Re-export all other types that don't have circular references
export * from '../api/database/data-contracts';
