// Import API types (auto-generated from Swagger)
import type {
	AllSamples,
	AltCode,
	AltInt,
	AltStyle,
	AssayBatch,
	AssayBatchDetail,
	AssayBatchStatus,
	AssayBatchStatusLog,
	AssayClassification,
	AssayDispatchGroup,
	AssayElement,
	AssayElementGroup,
	AssayLab,
	AssayLabElementAlias,
	AssayLabMethod,
	AssayMethodGeneric,
	AuditLog,
	Casing,
	CasingClass,
	CasingSize,
	ClastComp,
	ClastDistribution,
	CodingSystem,
	CollarCoordinate,
	CollarHistory,
	CollarType,
	ColourCode,
	ColourTone,
	Company,
	CompanyType,
	ContactRelation,
	Contamination,
	CoordinateType,
	CoreDiameter,
	CoreQuality,
	CoreRecoveryRunLog,
	CostCodes,
	CycloneCleaning,
	Department,
	DownHoleSurveyMethod,
	DrillMethod,
	DrillPattern,
	DrillPatternCode,
	DrillPatternType,
	DrillPlanStatus,
	DrillPlanStatusHistory,
	DrillProgram,
	DrillSize,
	DrillType,
	EntityType,
	EntityTypeConfig,
	EntityTypeRelationship,
	FacingDirection,
	FaultId,
	FilteredSetEntity,
	FilteredSetParameter,
	FilteredSetShare,
	Filteredset,
	FractureCountAlignment,
	FractureCountEmboitement,
	FractureCountLineQuality,
	FractureCountLog,
	FractureStyle,
	GeologyCombinedLog,
	GeotHardness,
	GeotJa,
	GeotJn,
	GeotJr,
	GeotJw,
	GeotMacroRoughness,
	GeotMatrix,
	GeotMicroRoughness,
	GeotPersistence,
	GeotRockMassDomain,
	GeotStrength,
	Grid,
	GroundWaterIndication,
	Hole,
	HoleDiameter,
	HoleName,
	HoleNmPrefix,
	HolePurpose,
	HolePurposeDetail,
	HoleStatus,
	HoleType,
	Instrument,
	InstrumentType,
	IntactRockStrength,
	Intensity,
	KinematicIndicator,
	LabDispatch,
	LeaseStatus,
	LineamentType,
	LithGrainsize,
	LithRegOvpt,
	LithTexture,
	Lithology,
	LoggingEvent,
	LoggingEventType,
	LookUpNormalization,
	Machinery,
	MachineryClassification,
	MagInt,
	MagSusFactor,
	MagSusLog,
	MapSheet,
	MapSurface,
	MatrixComp,
	MeshSize,
	MetaDataLog,
	MinCode,
	MinInt,
	MinStyle,
	MovementSense,
	OpenJointSets,
	Organization,
	OrientationQuality,
	ParageneticStage,
	ParameterType,
	ParentCode,
	Person,
	PersonType,
	Phase,
	PickList,
	PickListUser,
	PickListValue,
	Pit,
	ProgramCode,
	ProgramType,
	Project,
	Prospect,
	ProtolithCode,
	PtGeologyLog,
	PtLoggingEvent,
	PtMagSusLog,
	PtMappingLog,
	PtSample,
	QcAnalysisType,
	QcClassification,
	QcFilteredset,
	QcGroup,
	QcInsertionRule,
	QcInsertionRuleStandardSequence,
	QcReference,
	QcReferenceType,
	QcReferenceValue,
	QcReferenceValueType,
	QcRule,
	QcStatisticalLimits,
	QcType,
	Relog,
	ReportingClassification,
	ReportingType,
	RigSetup,
	RigType,
	RockMassFabric,
	RockMechanicLog,
	RockQualityDesignationLog,
	Role,
	RowStatus,
	SampleClassification,
	SampleCondition,
	SampleMethod,
	SampleType,
	Section,
	SectionVersion,
	ShearAspect,
	ShearLog,
	Shift,
	Site,
	SiteCoordinate,
	SoilHorizon,
	SpecificGravityPtLog,
	StructAngleSet,
	StructClass,
	StructFillTexture,
	StructFillThickness,
	StructFillType,
	StructLineationType,
	StructPlaneType,
	StructRoughness,
	StructShape,
	StructSpacing,
	StructType,
	StructWallContactType,
	StructWallRockCompetency,
	StructZone,
	StructureLog,
	StructurePtLog,
	SubTarget,
	SubjRec,
	Survey,
	SurveyLog,
	SurveyMethod,
	SurveyReliability,
	SynchStatus,
	Target,
	Template,
	Tenement,
	TenementStatus,
	Terrain,
	UnitType,
	Units,
	User,
	UserRole,
	ValidationError,
	Vegetation,
	VeinCode,
	VeinStyle,
	VeinTexture,
	Vergence,
	VwCollar,
	VwDrillPlan,
	Weathering,
	YoungingIndicator,
	Zone,
} from "../api/database/data-contracts";

import type { ApprovalStatus } from "../domain/schema-helpers";
import Dexie from "dexie";
import type { LookupMetadata } from "../types/lookupTypes";
/**
 * Dexie Database Schema
 * Offline-first storage using IndexedDB with dexie-syncable for two-way sync
 *
 * Architecture:
 * - dexie-observable: Tracks all changes for sync
 * - dexie-syncable: Two-way sync with server via custom protocol
 * - Selective sync: Users choose which programs/collars to sync offline
 */
import type { Table } from "dexie";
import { registerMigrations } from "./migrations";

/**
 * Sync metadata for selective sync
 * Tracks which entities user has selected for offline use
 */
export interface SyncMetadata {
	id?: number
	entityType: "Collar" | "DrillPlan" | "GeologyCombinedLog" | "Survey" | "CoreRecovery" | "Geotech" | "Sample"
	entityId: string
	collarId?: string
	programId?: string
	isOffline: boolean
	lastSyncedRevision: any
	createdAt?: Date
	updatedAt?: Date
}

/**
 * B2Gold Offline Database
 *
 * Index Strategy:
 * - & prefix = Auto-generated GUID primary key if not provided
 * - Single indexes for frequently queried fields
 * - Compound indexes [field1+field2] for combined queries
 *
 * Performance:
 * - Primary key lookups: < 10ms
 * - Indexed queries: < 50ms for 500 rows
 * - Full table scans: Avoid by proper indexing
 */
export class B2GoldOfflineDBv2 extends Dexie {
	// Core entity tables
	DrillHole_Collar!: Table<VwCollar, string>;
	Planning_DrillPlan!: Table<VwDrillPlan, string>;

	// AssayResult_Assay!: Table<Assay, string>;
	// AssayResult_PivotedAssayResults!: Table<PivotedAssayResults, string>;
	// AssayResult_XRF!: Table<XRF, string>;
	// AssayResult_XRFHeader!: Table<XRFHeader, string>;
	Audit_AuditLog!: Table<AuditLog, string>;
	Audit_DocumentRecord!: Table<any, string>;

	Auth_Role!: Table<Role, string>;
	Auth_User!: Table<User, string>;
	Auth_UserRole!: Table<UserRole, string>;

	Classification_HoleNmPrefix!: Table<HoleNmPrefix, string>;
	Classification_Organization!: Table<Organization, string>;
	Classification_Phase!: Table<Phase, string>;
	Classification_Pit!: Table<Pit, string>;
	Classification_Project!: Table<Project, string>;
	Classification_Prospect!: Table<Prospect, string>;
	Classification_Section!: Table<Section, string>;
	Classification_SubTarget!: Table<SubTarget, string>;
	Classification_Target!: Table<Target, string>;
	Classification_Tenement!: Table<Tenement, string>;
	Classification_Zone!: Table<Zone, string>;
	// DrillHole_Collar!: Table<Collar, string>;
	DrillHole_CollarCoordinate!: Table<CollarCoordinate, string>;
	DrillHole_CollarHistory!: Table<CollarHistory, string>;
	DrillHole_Comment!: Table<Comment, string>;
	DrillHole_CycloneCleaning!: Table<CycloneCleaning, string>;
	DrillHole_DrillMethod!: Table<DrillMethod, string>;
	DrillHole_Hole!: Table<Hole, string>;
	DrillHole_HoleName!: Table<HoleName, string>;
	DrillHole_LoggingEvent!: Table<LoggingEvent, string>;
	DrillHole_MetaDataLog!: Table<MetaDataLog, string>;
	DrillHole_RigSetup!: Table<RigSetup, string>;
	DrillHole_SectionVersion!: Table<SectionVersion, string>;
	DrillHole_Survey!: Table<Survey, string>;
	DrillHole_SurveyLog!: Table<SurveyLog, string>;
	DrillHole_ValidationError!: Table<ValidationError, string>;

	Filteredset_EntityTypeConfig!: Table<EntityTypeConfig, string>;
	Filteredset_EntityTypeRelationship!: Table<EntityTypeRelationship, string>;
	Filteredset_Filteredset!: Table<Filteredset, string>;
	Filteredset_FilteredSetEntity!: Table<FilteredSetEntity, string>;
	Filteredset_FilteredSetParameter!: Table<FilteredSetParameter, string>;
	Filteredset_FilteredSetShare!: Table<FilteredSetShare, string>;
	Filteredset_ParameterType!: Table<ParameterType, string>;

	Geology_GeologyCombinedLog!: Table<GeologyCombinedLog, string>;
	Geology_ShearLog!: Table<ShearLog, string>;
	Geology_StructureLog!: Table<StructureLog, string>;
	Geology_StructurePtLog!: Table<StructurePtLog, string>;
	Geotech_CoreRecoveryRunLog!: Table<CoreRecoveryRunLog, string>;
	Geotech_FractureCountLog!: Table<FractureCountLog, string>;
	Geotech_MagSusLog!: Table<MagSusLog, string>;
	Geotech_RockMechanicLog!: Table<RockMechanicLog, string>;
	Geotech_RockQualityDesignationLog!: Table<RockQualityDesignationLog, string>;
	Geotech_SpecificGravityPtLog!: Table<SpecificGravityPtLog, string>;

	Lookup_AltCode!: Table<AltCode, string>;
	Lookup_AltInt!: Table<AltInt, string>;
	Lookup_AltStyle!: Table<AltStyle, string>;
	Lookup_ApprovalStatus!: Table<ApprovalStatus, string>;
	Lookup_AssayClassification!: Table<AssayClassification, string>;
	Lookup_AssayDispatchGroup!: Table<AssayDispatchGroup, string>;
	Lookup_AutoAssayActionTypes!: Table<any, string>;
	Lookup_AutoAssayImportRuleTypes!: Table<any, string>;
	Lookup_AutoAssayQAQCType!: Table<any, string>;
	Lookup_Backfill!: Table<any, string>;
	Lookup_BitType!: Table<any, string>;
	Lookup_Casing!: Table<Casing, string>;
	Lookup_CasingClass!: Table<CasingClass, string>;
	Lookup_CasingSize!: Table<CasingSize, string>;
	Lookup_ClastComp!: Table<ClastComp, string>;
	Lookup_ClastDistribution!: Table<ClastDistribution, string>;
	Lookup_CodingSystem!: Table<CodingSystem, string>;
	Lookup_CollarType!: Table<CollarType, string>;
	Lookup_ColourCode!: Table<ColourCode, string>;
	Lookup_ColourTone!: Table<ColourTone, string>;
	Lookup_Company!: Table<Company, string>;
	Lookup_CompanyType!: Table<CompanyType, string>;
	Lookup_COMPGRP!: Table<any, string>;
	Lookup_ConsignmentDepot!: Table<any, string>;
	Lookup_ContactRelation!: Table<ContactRelation, string>;
	Lookup_Contamination!: Table<Contamination, string>;
	Lookup_ContractActivityLogStatus!: Table<any, string>;
	Lookup_ContractItemClassification!: Table<any, string>;
	Lookup_ContractType!: Table<any, string>;
	Lookup_CoordinateType!: Table<CoordinateType, string>;
	Lookup_CoreDiameter!: Table<CoreDiameter, string>;
	Lookup_CoreQuality!: Table<CoreQuality, string>;
	Lookup_CostCodeReportType!: Table<any, string>;
	Lookup_CostCodes!: Table<CostCodes, string>;
	Lookup_Country!: Table<any, string>;
	Lookup_CurrencyCode!: Table<any, string>;
	Lookup_Department!: Table<Department, string>;
	Lookup_DispatchPrefix!: Table<any, string>;
	Lookup_DispatchPulpStatus!: Table<any, string>;
	Lookup_DispatchStatus!: Table<any, string>;
	Lookup_DomainCode!: Table<any, string>;
	Lookup_DownHoleSurveyMethod!: Table<DownHoleSurveyMethod, string>;
	Lookup_DrillPatternCode!: Table<DrillPatternCode, string>;
	Lookup_DrillPatternType!: Table<DrillPatternType, string>;
	Lookup_DrillPlanStatus!: Table<DrillPlanStatus, string>;
	Lookup_DrillSize!: Table<DrillSize, string>;
	Lookup_DrillType!: Table<DrillType, string>;
	Lookup_EntityType!: Table<EntityType, string>;
	Lookup_EventCode!: Table<any, string>;
	Lookup_FacingDirection!: Table<FacingDirection, string>;
	Lookup_FailureType!: Table<any, string>;
	Lookup_FaultId!: Table<FaultId, string>;
	Lookup_FractureCountAlignment!: Table<FractureCountAlignment, string>;
	Lookup_FractureCountEmboitement!: Table<FractureCountEmboitement, string>;
	Lookup_FractureCountLineQuality!: Table<FractureCountLineQuality, string>;
	Lookup_FractureStyle!: Table<FractureStyle, string>;
	Lookup_Geomorphology!: Table<any, string>;
	Lookup_GeotFFRating!: Table<any, string>;
	Lookup_GeotHardness!: Table<GeotHardness, string>;
	Lookup_GeotIRSRating!: Table<any, string>;
	Lookup_GeotJa!: Table<GeotJa, string>;
	Lookup_GeotJn!: Table<GeotJn, string>;
	Lookup_GeotJr!: Table<GeotJr, string>;
	Lookup_GeotJw!: Table<GeotJw, string>;
	Lookup_GeotMacroRoughness!: Table<GeotMacroRoughness, string>;
	Lookup_GeotMatrix!: Table<GeotMatrix, string>;
	Lookup_GeotMicroRoughness!: Table<GeotMicroRoughness, string>;
	Lookup_GeotPersistence!: Table<GeotPersistence, string>;
	Lookup_GeotRockMassDomain!: Table<GeotRockMassDomain, string>;
	Lookup_GeotRockStrengthFailureMode!: Table<any, string>;
	Lookup_GeotRockStrengthPostTestCondition!: Table<any, string>;
	Lookup_GeotRockSupport!: Table<any, string>;
	Lookup_GeotSRF!: Table<any, string>;
	Lookup_GeotStrength!: Table<GeotStrength, string>;
	Lookup_GeotStrengthFailureMode!: Table<any, string>;
	Lookup_GeotStrengthTestType!: Table<any, string>;
	Lookup_GLVC!: Table<any, string>;
	Lookup_GLVC3TSource!: Table<any, string>;
	Lookup_Grid!: Table<Grid, string>;
	Lookup_GroundWaterIndication!: Table<GroundWaterIndication, string>;
	Lookup_GroutType!: Table<any, string>;
	Lookup_HoleDiameter!: Table<HoleDiameter, string>;
	Lookup_HolePurpose!: Table<HolePurpose, string>;
	Lookup_HolePurposeDetail!: Table<HolePurposeDetail, string>;
	Lookup_HoleStatus!: Table<HoleStatus, string>;
	Lookup_HoleType!: Table<HoleType, string>;
	Lookup_IncidentAction!: Table<any, string>;
	Lookup_IncidentSeverity!: Table<any, string>;
	Lookup_IncidentType!: Table<any, string>;
	Lookup_Instrument!: Table<Instrument, string>;
	Lookup_InstrumentType!: Table<InstrumentType, string>;
	Lookup_IntactRockStrength!: Table<IntactRockStrength, string>;
	Lookup_Intensity!: Table<Intensity, string>;
	Lookup_KinematicIndicator!: Table<KinematicIndicator, string>;
	Lookup_LeaseStatus!: Table<LeaseStatus, string>;
	Lookup_LineamentType!: Table<LineamentType, string>;
	Lookup_LithGrainsize!: Table<LithGrainsize, string>;
	Lookup_Lithology!: Table<Lithology, string>;
	Lookup_LithRegOvpt!: Table<LithRegOvpt, string>;
	Lookup_LithTexture!: Table<LithTexture, string>;
	Lookup_LodeCode!: Table<any, string>;
	Lookup_LoggingEventType!: Table<LoggingEventType, string>;
	Lookup_Machinery!: Table<Machinery, string>;
	Lookup_MachineryClassification!: Table<MachineryClassification, string>;
	Lookup_MachineryStatusClassification!: Table<any, string>;
	Lookup_MagInt!: Table<MagInt, string>;
	Lookup_MagSusFactor!: Table<MagSusFactor, string>;
	Lookup_MapSheet!: Table<MapSheet, string>;
	Lookup_MapSurface!: Table<MapSurface, string>;
	Lookup_MatrixComp!: Table<MatrixComp, string>;
	Lookup_MeetingType!: Table<any, string>;
	Lookup_MeshSize!: Table<MeshSize, string>;
	Lookup_MetamorphicGrade!: Table<any, string>;
	Lookup_MinCode!: Table<MinCode, string>;
	Lookup_MinInt!: Table<MinInt, string>;
	Lookup_MinPotential!: Table<any, string>;
	Lookup_MinStyle!: Table<MinStyle, string>;
	Lookup_Months!: Table<any, string>;
	Lookup_MovementSense!: Table<MovementSense, string>;
	Lookup_OpenJointSets!: Table<OpenJointSets, string>;
	Lookup_OrientationPosition!: Table<any, string>;
	Lookup_OrientationQuality!: Table<OrientationQuality, string>;
	Lookup_OrientationType!: Table<OrientationType, string>;
	Lookup_Oxidation!: Table<any, string>;
	Lookup_OxidationStyle!: Table<any, string>;
	Lookup_ParageneticStage!: Table<ParageneticStage, string>;
	Lookup_ParentCode!: Table<ParentCode, string>;
	Lookup_Person!: Table<Person, string>;
	Lookup_PersonType!: Table<PersonType, string>;
	Lookup_PetrologyType!: Table<any, string>;
	Lookup_PhotoClassification!: Table<any, string>;
	Lookup_PhotoLocationType!: Table<any, string>;
	Lookup_PhotoType!: Table<any, string>;
	Lookup_PlugMaterial!: Table<any, string>;
	Lookup_ProgramCode!: Table<ProgramCode, string>;
	Lookup_ProgramType!: Table<ProgramType, string>;
	Lookup_ProtolithCode!: Table<ProtolithCode, string>;
	Lookup_Provenance!: Table<any, string>;
	Lookup_PTSiteType!: Table<any, string>;
	Lookup_QCGradeRange!: Table<any, string>;
	Lookup_Region!: Table<any, string>;
	Lookup_Relog!: Table<Relog, string>;
	Lookup_ReportingClassification!: Table<ReportingClassification, string>;
	Lookup_ReportingDatePeriod!: Table<any, string>;
	Lookup_ReportingType!: Table<ReportingType, string>;
	Lookup_RigType!: Table<RigType, string>;
	Lookup_RockMassFabric!: Table<RockMassFabric, string>;
	Lookup_RowStatus!: Table<RowStatus, string>;
	Lookup_SampleClassification!: Table<SampleClassification, string>;
	Lookup_SampleCondition!: Table<SampleCondition, string>;
	Lookup_SampleMethod!: Table<SampleMethod, string>;
	Lookup_SamplePackingType!: Table<any, string>;
	Lookup_SampleTestType!: Table<any, string>;
	Lookup_SampleType!: Table<SampleType, string>;
	Lookup_SGDryMethod!: Table<any, string>;
	Lookup_SGMethod!: Table<any, string>;
	Lookup_ShearAspect!: Table<ShearAspect, string>;
	Lookup_Shift!: Table<Shift, string>;
	Lookup_SiteMonitoringType!: Table<any, string>;
	Lookup_SitePrep!: Table<any, string>;
	Lookup_SoilHorizon!: Table<SoilHorizon, string>;
	Lookup_StandardSampleSourceType!: Table<any, string>;
	Lookup_StorageActivity!: Table<any, string>;
	Lookup_StorageLocation!: Table<any, string>;
	Lookup_Stratigraphy!: Table<any, string>;
	Lookup_StructAngleSet!: Table<StructAngleSet, string>;
	Lookup_StructClass!: Table<StructClass, string>;
	Lookup_StructContinuity!: Table<any, string>;
	Lookup_StructFillTexture!: Table<StructFillTexture, string>;
	Lookup_StructFillThickness!: Table<StructFillThickness, string>;
	Lookup_StructFillType!: Table<StructFillType, string>;
	Lookup_StructLineationType!: Table<StructLineationType, string>;
	Lookup_StructPlaneType!: Table<StructPlaneType, string>;
	Lookup_StructPTMethod!: Table<any, string>;
	Lookup_StructPTQuality!: Table<any, string>;
	Lookup_StructRoughness!: Table<StructRoughness, string>;
	Lookup_StructShape!: Table<StructShape, string>;
	Lookup_StructSpacing!: Table<StructSpacing, string>;
	Lookup_StructType!: Table<StructType, string>;
	Lookup_StructWallContactType!: Table<StructWallContactType, string>;
	Lookup_StructWallRockCompetency!: Table<StructWallRockCompetency, string>;
	Lookup_StructZone!: Table<StructZone, string>;
	Lookup_SubjRec!: Table<SubjRec, string>;
	Lookup_SurveyMethod!: Table<SurveyMethod, string>;
	Lookup_SurveyReliability!: Table<SurveyReliability, string>;
	Lookup_SynchStatus!: Table<SynchStatus, string>;
	Lookup_TargetCode!: Table<any, string>;
	Lookup_TargetType!: Table<any, string>;
	Lookup_TaskPriority!: Table<any, string>;
	Lookup_TaskStatus!: Table<any, string>;
	Lookup_TaskType!: Table<any, string>;
	Lookup_TenementStatus!: Table<TenementStatus, string>;
	Lookup_Terrain!: Table<Terrain, string>;
	Lookup_Units!: Table<Units, string>;
	Lookup_UnitType!: Table<UnitType, string>;
	Lookup_UserStatusType!: Table<any, string>;
	Lookup_Validation!: Table<any, string>;
	Lookup_Vegetation!: Table<Vegetation, string>;
	Lookup_VeinCode!: Table<VeinCode, string>;
	Lookup_VeinStyle!: Table<VeinStyle, string>;
	Lookup_VeinTexture!: Table<VeinTexture, string>;
	Lookup_Vergence!: Table<Vergence, string>;
	Lookup_WaterIntersectionType!: Table<any, string>;
	Lookup_WaterQuality!: Table<any, string>;
	Lookup_Weathering!: Table<Weathering, string>;
	Lookup_WeathStyle!: Table<any, string>;
	Lookup_XRFBagType!: Table<any, string>;
	Lookup_YoungingIndicator!: Table<YoungingIndicator, string>;

	Planning_DrillPattern!: Table<DrillPattern, string>;
	Planning_DrillPlanStatusHistory!: Table<DrillPlanStatusHistory, string>;
	Planning_DrillProgram!: Table<DrillProgram, string>;
	Processing_AssayBatch!: Table<AssayBatch, string>;
	Processing_AssayBatchDetail!: Table<AssayBatchDetail, string>;
	Processing_AssayBatchStatus!: Table<AssayBatchStatus, string>;
	Processing_AssayBatchStatusLog!: Table<AssayBatchStatusLog, string>;
	Processing_AssayElement!: Table<AssayElement, string>;
	Processing_AssayElementGroup!: Table<AssayElementGroup, string>;
	Processing_AssayLab!: Table<AssayLab, string>;
	Processing_AssayLabElementAlias!: Table<AssayLabElementAlias, string>;
	Processing_AssayLabMethod!: Table<AssayLabMethod, string>;
	Processing_AssayMethodGeneric!: Table<AssayMethodGeneric, string>;

	QAQC_QCAnalysisType!: Table<QcAnalysisType, string>;
	QAQC_QCClassification!: Table<QcClassification, string>;
	QAQC_QCFilteredset!: Table<QcFilteredset, string>;
	QAQC_QCGroup!: Table<QcGroup, string>;
	QAQC_QCInsertionRule!: Table<QcInsertionRule, string>;
	QAQC_QCInsertionRuleStandardSequence!: Table<QcInsertionRuleStandardSequence, string>;
	QAQC_QCReference!: Table<QcReference, string>;
	QAQC_QCReferenceType!: Table<QcReferenceType, string>;
	QAQC_QCReferenceValue!: Table<QcReferenceValue, string>;
	QAQC_QCReferenceValueType!: Table<QcReferenceValueType, string>;
	QAQC_QCRule!: Table<QcRule, string>;
	QAQC_QCStatisticalLimits!: Table<QcStatisticalLimits, string>;
	QAQC_QCType!: Table<QcType, string>;

	Sample!: Table<AllSamples, string>;

	Sample_LabDispatch!: Table<LabDispatch, string>;
	Sample_PtSample!: Table<PtSample, string>;
	Sample_PtSampleQC!: Table<any, string>;
	// Sample_Sample!: Table<Sample, string>;
	// Sample_SampleDispatch!: Table<SampleDispatch, string>;
	// Sample_SampleIndex!: Table<SampleIndex, string>;
	// Sample_SampleQC!: Table<any, string>;
	// Sample_SampleRegister!: Table<SampleRegister, string>;
	// Sample_StandardSample!: Table<StandardSample, string>;
	// Sample_StandardSampleQC!: Table<any, string>;
	// Sample_XRFSample!: Table<any, string>;
	// Sample_XRFSampleQC!: Table<any, string>;
	// Sample_XRFStandardSample!: Table<any, string>;

	SurfacePt_PtGeologyLog!: Table<PtGeologyLog, string>;
	SurfacePt_PtLoggingEvent!: Table<PtLoggingEvent, string>;
	SurfacePt_PtMagSusLog!: Table<PtMagSusLog, string>;
	SurfacePt_PtMappingLog!: Table<PtMappingLog, string>;
	SurfacePt_Site!: Table<Site, string>;
	SurfacePt_SiteCoordinate!: Table<SiteCoordinate, string>;

	System_Config!: Table<any, string>;
	System_LookUpNormalization!: Table<LookUpNormalization, string>;
	System_PickList!: Table<PickList, string>;
	System_PickListUser!: Table<PickListUser, string>;
	System_PickListValue!: Table<PickListValue, string>;
	System_Template!: Table<Template, string>;

	// Lookup metadata for versioning
	syncMetadata!: Table<SyncMetadata, number>;
	lookupMetadata!: Table<LookupMetadata, number>;
	test!: Table<any, string>;
	// Database readiness flag
	private _isReady = false;

	get isReady(): boolean {
		return this._isReady;
	}

	constructor() {
		super("B2GoldOfflineDBv2");

		registerMigrations(this);
		// Schema Version 1
		// this.version(1).stores({
		// 	// Collars table
		// 	// Index by: primary key, project, phase, prospect, hole ID, status, active flag, rowversion
		// 	// Note: Most collars group by Project, Phase, Prospect (not DrillProgram)
		// 	collars: '&CollarId, Project, Phase, Prospect, Target, HoleId, RowStatus, ActiveInd, rv',

		// 	// Geology Logs table
		// 	// Compound index [CollarId+DepthFrom] for efficient depth-based queries
		// 	// Single indexes for status and rowversion
		// 	geologyCombinedLogs: '&GeologyCombinedLogId, CollarId, [CollarId+DepthFrom], [CollarId+RowStatus], DepthFrom, DepthTo, RowStatus, ActiveInd, rv',

		// 	// Surveys table
		// 	// Index by collar for survey metadata queries
		// 	surveys: '&SurveyId, CollarId, RowStatus, ActiveInd, rv',

		// 	// Survey Logs table
		// 	// Index by collar and depth for multi-source merge queries
		// 	surveyLogs: '&SurveyLogId, SurveyId, CollarId, [CollarId+Depth], Depth, RowStatus, ActiveInd, rv',

		// 	// Core Recovery Run Logs table
		// 	coreRecoveryRunLogs: '&CoreRecoveryRunLogId, CollarId, [CollarId+DepthFrom], DepthFrom, DepthTo, RowStatus, rv',

		// 	// Geotech table
		// 	geotechs: '&GeotechId, CollarId, [CollarId+DepthFrom], DepthFrom, DepthTo, RowStatus, ActiveInd, rv',

		// 	// Samples table
		// 	samples: '&SampleId, CollarId, [CollarId+DepthFrom], DepthFrom, DepthTo, RowStatus, ActiveInd, rv',

		// 	// Sync metadata
		// 	// Index by entity type, ID, collar, program, and offline flag for selective sync queries
		// 	syncMetadata: '++id, entityType, entityId, collarId, programId, isOffline, [entityType+isOffline]',
		// });

		// // Schema Version 2 - Add DrillPlans table
		// this.version(2).stores({
		// 	// Keep existing tables (Dexie automatically carries them forward)
		// 	collars: '&CollarId, Project, Phase, Prospect, Target, HoleId, RowStatus, ActiveInd, rv',
		// 	geologyCombinedLogs: '&GeologyCombinedLogId, CollarId, [CollarId+DepthFrom], [CollarId+RowStatus], DepthFrom, DepthTo, RowStatus, ActiveInd, rv',
		// 	surveys: '&SurveyId, CollarId, RowStatus, ActiveInd, rv',
		// 	surveyLogs: '&SurveyLogId, SurveyId, CollarId, [CollarId+Depth], Depth, RowStatus, ActiveInd, rv',
		// 	coreRecoveryRunLogs: '&CoreRecoveryRunLogId, CollarId, [CollarId+DepthFrom], DepthFrom, DepthTo, RowStatus, rv',
		// 	geotechs: '&GeotechId, CollarId, [CollarId+DepthFrom], DepthFrom, DepthTo, RowStatus, ActiveInd, rv',
		// 	samples: '&SampleId, CollarId, [CollarId+DepthFrom], DepthFrom, DepthTo, RowStatus, ActiveInd, rv',
		// 	syncMetadata: '++id, entityType, entityId, collarId, programId, isOffline, [entityType+isOffline]',

		// 	// NEW: DrillPlans table with strategic indexes
		// 	// Index strategy optimized for filtering and searching
		// 	drillPlans: '&DrillPlanId, DrillPattern, HoleStatus, Project, Target, Organization, PlannedBy, RowStatus, ActiveInd, rv',
		// });

		// // Schema Version 3 - Add Lookup Tables
		// this.version(3).stores({
		// 	// Keep existing tables
		// 	collars: '&CollarId, Project, Phase, Prospect, Target, HoleId, RowStatus, ActiveInd, rv',
		// 	drillPlans: '&DrillPlanId, DrillPattern, HoleStatus, Project, Target, Organization, PlannedBy, RowStatus, ActiveInd, rv',
		// 	geologyCombinedLogs: '&GeologyCombinedLogId, CollarId, [CollarId+DepthFrom], [CollarId+RowStatus], DepthFrom, DepthTo, RowStatus, ActiveInd, rv',
		// 	surveys: '&SurveyId, CollarId, RowStatus, ActiveInd, rv',
		// 	surveyLogs: '&SurveyLogId, SurveyId, CollarId, [CollarId+Depth], Depth, RowStatus, ActiveInd, rv',
		// 	coreRecoveryRunLogs: '&CoreRecoveryRunLogId, CollarId, [CollarId+DepthFrom], DepthFrom, DepthTo, RowStatus, rv',
		// 	samples: '&SampleId, CollarId, [CollarId+DepthFrom], DepthFrom, DepthTo, RowStatus, ActiveInd, rv',
		// 	syncMetadata: '++id, entityType, entityId, collarId, programId, isOffline, [entityType+isOffline]',

		// 	// NEW: Lookup tables - Critical (Phase 1)
		// 	// Standard indexing: Code (PK), Description (search), SortOrder (ordering)
		// 	holeStatus: 'Code, Description, SortOrder',
		// 	holePurpose: 'Code, Description, SortOrder',
		// 	holeType: 'Code, Description, SortOrder',
		// 	collarType: 'Code, Description, SortOrder',
		// 	organization: 'Code, Description, SortOrder',
		// 	project: 'Code, Description, SortOrder',
		// 	phase: 'Code, Description, SortOrder',
		// 	drillType: 'Code, Description, SortOrder',
		// 	sampleType: 'Code, Description, SortOrder',

		// 	// NEW: Lookup tables - Common (Phase 2)
		// 	company: 'Code, Description, CompanyType, SortOrder',
		// 	contractor: 'Code, Description, SortOrder',
		// 	rig: 'Code, Description, SortOrder',
		// 	assayLab: 'LabCode, LabDescription, SortOrder',

		// 	// NEW: Lookup tables - Geology (Phase 3)
		// 	lithology: 'Code, Description, SortOrder',
		// 	lithGrainsize: 'Code, Description, SortOrder',
		// 	lithTexture: 'Code, Description, SortOrder',
		// 	altCode: 'Code, Description, SortOrder',
		// 	altInt: 'Code, Description, SortOrder',
		// 	altStyle: 'Code, Description, SortOrder',
		// 	minCode: 'Code, Description, SortOrder',
		// 	minInt: 'Code, Description, SortOrder',

		// 	// NEW: Lookup metadata for version tracking

		// });
		this.version(4).stores(
			{
				AssayResult_Assay: "&Organization, SampleId, BatchNo, [Element+BatchNo+LabCode+Preferred], [Element+Repeat+BatchNo+sysResult+Preferred+Organization], [Organization+SampleId+LabElement], [GenericMethod+Element+BatchNo+Preferred+sysResult+Repeat+Organization+SampleId+LabCode], [Organization+SampleId+Repeat+Preferred+LabElement], [LabCode+BatchNo], [Organization+SampleId+OriginalMethod+Repeat+Preferred], [LabElement+Organization+SampleId+Repeat+Preferred], [Organization+SampleId+GenericMethod+Element+AssayClassification+Repeat+Preferred+LabCode+BatchNo], &AssayId, [Organization+SampleId+GenericMethod+Element+Repeat+Preferred+LabCode+BatchNo], UnitCode",
				// AssayResult_PivotedAssayResults: "&PivotedAssayResultsId",
				// AssayResult_PivotedXRFResult: "&PivotedXRFResultId",
				AssayResult_XRF: "&Organization, SampleId, [Organization+SampleId+LabElement], [Organization+SampleId+Repeat+Preferred+LabElement], [LabElement+Organization+SampleId+Repeat+Preferred], [Element+Repeat+BatchNo+sysResult+Preferred+Organization], [LabCode+BatchNo], [Organization+SampleId+Repeat+SourceRowNumber], [Organization+SampleId+GenericMethod+Element+Repeat+Preferred+LabCode+BatchNo], [Organization+SampleId+OriginalMethod+Repeat+Preferred+XRFId], UnitCode, XRFHeaderId",
				AssayResult_XRFHeader: "&Organization, [Organization+SampleId+SourceRowNumber+Repeat+XRFHeaderId], BagType",

				//	Audit_AuditLog: '&AuditLogId, [EntityTypeId+EntityId+Action+CreatedOnDt], [EntityTypeId+EntityId+Action+CreatedOnDt], [EntityTypeId+EntityId+Action+CreatedOnDt], [Organization+EntityTypeId+Action+EntityId+AuditLogId]',
				// Audit_DocumentRecord: null,

				Auth_Role: "&Role, rv",
				Auth_User: "&UserNm, &Email, &UserNm, rv",
				Auth_UserRole: "&UserRoleId, UserNm, rv",

				Classification_HoleNmPrefix: "&HoleNmPrefixId, rv",
				Classification_Organization: "&Organization, &OrganizationId, rv",
				Classification_Phase: "&Phase, rv",
				Classification_Pit: "&Pit, rv",
				Classification_Project: "&Project, &ProjectId, rv",
				Classification_Prospect: "&Prospect, [Project+Prospect], rv",
				Classification_Section: "&Code, SortOrder, IsDefaultInd, rv",
				Classification_SubTarget: "&SubTarget, [Target+SubTarget], rv",
				Classification_Target: "&Target, Organization, Tenement, rv",
				Classification_Tenement: "&Tenement, CostCd, Holder, LeaseStatus, RegStatus, rv",
				Classification_Zone: "&Code, SortOrder, IsDefaultInd, rv",

				DrillHole_Collar: "&CollarId, HoleType, [Organization+CollarId+Priority], [Organization+LoggingEventId], [Organization+CollarId], CollarType, ExplorationCompany, HolePurpose, Phase, Pit, Project, Prospect, ResponsiblePerson, ResponsiblePerson2, RowStatus, Section, SubTarget, Target, Tenement, rv",
				DrillHole_CollarCoordinate: "&Organization, CollarId, Grid, RowStatus, SurveyCompany, SurveyMethod",
				// DrillHole_CollarHistory: '&CollarId',
				DrillHole_Comment: "&CommentId, EntityTypeId, EntityId ,[EntityTypeId+EntityId]",
				DrillHole_CycloneCleaning: "&Organization, CollarId, DriLatitudeLongitudeOperator, LoggedBy, RowStatus",
				DrillHole_DrillMethod: "&DrillMethodId, CollarId, DrillCompany, DrillRigType, DrillSize, DrillType, Organization, RowStatus, SampleType",
				DrillHole_Hole: "&HoleId, [Organization+HoleId], [Organization+HoleStatus+HoleId]",
				DrillHole_HoleName: "&HoleNameId, [HoleId+NameType], [NameType+HoleId]",
				DrillHole_LoggingEvent: "&Organization, LoggedBy, LoggingEventType",
				DrillHole_MetaDataLog: "&MetaDataLogId, [Organization+CollarId+LoggingEventId+DepthFrom+ActiveInd+MetaDataLogId], [Organization+CollarId+DepthFrom], Casing, CasingClass, CasingSize, RowStatus",
				DrillHole_RigSetup: "&RigSetupId, [Organization+DrillPlanId], &DrillPlanId, DownHoleSurveyDriller, DownHoleSurveyDrillingContractor, DownHoleSurveyRigNo, DrillingCompany, DrillSupervisor, FinalGeologist, FinalSetupApprovedBy, FinalSetupDrillSupervisor, PadInspectionCompletedBy, RowStatus",
				// DrillHole_SectionVersion: '&EntityId',
				DrillHole_Survey: "&SurveyId, CollarId, DownHoleSurveyMethod, Grid, LoggingEventId, Organization, RowStatus, SurveyCompany, SurveyInstrument, SurveyOperator, SurveyReliability",
				DrillHole_SurveyLog: "&SurveyLogId, SurveyId, DownHoleSurveyMethod, Grid, LoggingEventId, Organization, RowStatus, SurveyCompany, SurveyInstrument, SurveyOperator, SurveyReliability",
				DrillHole_ValidationError: "&ValidationErrorId, &CollarId",

				Filteredset_EntityTypeConfig: "&EntityTypeConfigId, &EntityType, rv",
				Filteredset_EntityTypeRelationship: "&EntityTypeRelationshipId, ChildEntityType, ParentEntityType, [ParentEntityType+ChildEntityType], rv",
				Filteredset_Filteredset: "&FilteredSetId, Project, rv",
				Filteredset_FilteredSetEntity: "&FilteredSetEntityId, [EntityType+ActiveInd], [EntityType+EntityId], [FilteredSetId+EntityType], [FilteredSetId+EntityType+EntityId], rv",
				Filteredset_FilteredSetParameter: "&FilteredSetParameterId, [FilteredSetId+ActiveInd], [ParameterGroup+ParameterOrder], [ParameterTypeCd+ActiveInd], [ParameterTypeCd+ParameterGroup+ActiveInd], [FilteredSetId+ParameterTypeCd+ParameterOrder], ConditionalParameterTypeCd, rv",
				Filteredset_FilteredSetShare: "&FilteredSetShareId, UserNm, [FilteredSetId+UserNm], rv",
				Filteredset_ParameterType: "&ParameterTypeId, [DataType+ActiveInd], [ParameterGroup+SortOrder], &ParameterTypeCd, &ParameterTypeNm, ParentParameterTypeCd, UnitCode, rv",

				Geology_GeologyCombinedLog: "&GeologyCombinedLogId,CollarId, DepthFrom, [LoggingEventId+DepthFrom], AC, AltAlbite, AltBiotite, AltCarbonate, AltChlorite, AltEpidote, AltHematite, AltLimonite, AltMagnetite, AltPyrite, AltSericite, AltSilica, APY, CA, CD, CF, ClastComp, ClastDistribution,  Colour, COMPGRP, COMPGRPLookup, ContactRelation, Cp, GLVC3TSource, GR, GrainSize, Lithology, Mag, MatrixComp, Organization, Other, Po, Protolith, Py, PyGr, PyMode1, PyMode2, Q, RowStatus, SC, SE, SI, Structure, Texture, TUR, VeinMin, VeinMode, Weathering",
				Geology_ShearLog: "&ShearLogId, CollarId,[Organization+LoggingEventId+DepthFrom+Priority], RowStatus, SZ_Alt, SZ_Aspect, SZ_Struc",
				Geology_StructureLog: "&StructureLogId, [Organization+CollarId+LoggingEventId+DepthFrom+ActiveInd+StructureLogId], [Organization+CollarId+DepthFrom], FaultId, KinematicIndicator, LineationType, MovementSense, Plane_Intensity, PlaneType, RowStatus, StructureClass, StructureType, ValidatedBy, YoungingIndicator",
				Geology_StructurePtLog: "&StructurePtLogId, CollarId,Albite, Alt1Cd, Alt2Cd, Biotite, CarboNationale, Chlorite, FacingDirection, FractureStyle, GLVC, Hematite, Intensity, Joint_Fill_Coating, JointFiLatitudeLongitudeMin, JointRoughness, JointShape, LineamentType, LithCd, LoggingEventId, Magnetite, Min1Cd, Min2Cd, Organization, OrientationQuality, ParageneticStage, Pyrite, Relog, RowStatus, Sericite, ShearSense, Silica, StructurePointMethod, StructurePointQuality, StructureType, VeinTexture, Vergence, WaLatitudeLongitudeRockStrength, WidthUnitCode, Zone",
				Geotech_CoreRecoveryRunLog: "&CoreRecoveryRunLogId,CollarId, [Organization+CollarId+LoggingEventId+DepthFrom+ActiveInd+CoreRecoveryRunLogId], [Organization+CollarId+DepthFrom], CoreDiameter, LoggedBy, OrientationQuality, RowStatus",

				Geotech_FractureCountLog: "&FractureCountLogId, CollarId, DepthFrom,[DepthFrom+DepthTo], [Organization+LoggingEventId], LoggingEventId, [LoggingEventId+DepthFrom+DepthTo], [Organization+CollarId+LoggingEventId+DepthFrom+ActiveInd+FractureCountLogId], [Organization+CollarId+DepthFrom], Alignment, Emboitement, LineQuality, LoggedBy, OrientationQuality, OrientationType, RowStatus",
				Geotech_MagSusLog: "&MagSusLogId, CollarId,DepthFrom,[Organization+CollarId+LoggingEventId+DepthFrom+ActiveInd+MagSusLogId], [Organization+CollarId+DepthFrom], HoleDiameter, Instrument, InstrumentFactorCode, ReadBy, RowStatus, SampleType",
				Geotech_RockMechanicLog: "&RockMechanicLogId,CollarId,DepthFrom, [Organization+CollarId+LoggingEventId+DepthFrom+ActiveInd+RockMechanicLogId], [Organization+CollarId+DepthFrom], CoreQuality, FiLatitudeLongitudeTexture, FiLatitudeLongitudeThickness, FiLatitudeLongitudeType, Fill_Min1, Fill_Min2, GroundWaterIndication, Hardness, IntactRockStrengthStrong, Jn, Jr, Jw, Lithology, LoggedBy, LongestPieceLengthUnitCode, MacroRoughness, MatrixType, MicroRoughness, OpenJointSets, Persistence, QJa, QJn, QJr, QJw, QSRF, RockMassDomain, RockMassFabric, RowStatus, Strength, StructureAngleSet, StructureInt, StructureRoughness, StructureSpacing, StructureType, WaLatitudeLongitudeContactType, WaLatitudeLongitudeRockAltCd, WaLatitudeLongitudeRockAltInt, WaLatitudeLongitudeRockCompetency, WeatheringStrong, WeatheringWeak",
				Geotech_RockQualityDesignationLog: "&RockQualityDesignationLogId,CollarId, [Organization+CollarId+LoggingEventId+DepthFrom+ActiveInd+RockQualityDesignationLogId], [Organization+CollarId+DepthFrom], LoggedBy, LongestPieceLengthUnitCode, OrientationQuality, RowStatus",
				Geotech_SpecificGravityPtLog: "&SpecificGravityPtLogId,CollarId, DiameterUnitCode, Dried, LengthUnitCode, Lithology, LoggingEventId, MeasuredBy, Organization, RowStatus, SampleType, SGMethod, UnitCode, Weather, WeightUnitCode",

				Lookup_AltCode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_AltInt: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_AltStyle: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ApprovalStatus: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_AssayClassification: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_AssayDispatchGroup: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_AutoAssayActionTypes: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_AutoAssayImportRuleTypes: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_AutoAssayQAQCType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Backfill: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_BitType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Casing: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_CasingClass: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_CasingSize: "&Code, Casing_Diameter_UnitCode,SortOrder, rv",
				Lookup_ClastComp: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ClastDistribution: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_CodingSystem: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_CollarType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ColourCode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ColourTone: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Company: "&Code, CompanyType,SortOrder, rv",
				Lookup_CompanyType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_COMPGRP: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ConsignmentDepot: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ContactRelation: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Contamination: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ContractActivityLogStatus: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ContractItemClassification: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ContractType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_CoordinateType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_CoreDiameter: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_CoreQuality: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_CostCodeReportType: "&CostCd, ReportingType, SortOrder, rv",
				Lookup_CostCodes: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Country: "&Code, Region, SortOrder, rv",
				Lookup_CurrencyCode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Department: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_DispatchPrefix: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_DispatchPulpStatus: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_DispatchStatus: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_DomainCode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_DownHoleSurveyMethod: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_DrillPatternCode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_DrillPatternType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_DrillPlanStatus: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_DrillSize: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_DrillType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_EntityType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_EventCode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_FacingDirection: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_FailureType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_FaultId: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_FractureCountAlignment: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_FractureCountEmboitement: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_FractureCountLineQuality: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_FractureStyle: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Geomorphology: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotFFRating: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotHardness: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotIRSRating: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotJa: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotJn: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotJr: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotJw: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotMacroRoughness: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotMatrix: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotMicroRoughness: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotPersistence: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotRockMassDomain: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotRockStrengthFailureMode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotRockStrengthPostTestCondition: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotRockSupport: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotSRF: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotStrength: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotStrengthFailureMode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GeotStrengthTestType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GLVC: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GLVC3TSource: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Grid: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GroundWaterIndication: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_GroutType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_HoleDiameter: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_HolePurpose: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_HolePurposeDetail: "&Code, HolePurpose,SortOrder, rv",
				Lookup_HoleStatus: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_HoleType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_IncidentAction: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_IncidentSeverity: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_IncidentType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Instrument: "&Code, InstrumentType, SortOrder,rv",
				Lookup_InstrumentType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_IntactRockStrength: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Intensity: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_KinematicIndicator: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_LeaseStatus: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_LineamentType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_LithGrainsize: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Lithology: "&Code, CodingSystem, ParentCd, SortOrder,rv",
				Lookup_LithRegOvpt: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_LithTexture: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_LodeCode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_LoggingEventType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Machinery: "&Company, ClassificationCode, SortOrder, rv",
				Lookup_MachineryClassification: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MachineryStatusClassification: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MagInt: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MagSusFactor: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MapSheet: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MapSurface: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MatrixComp: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MeetingType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MeshSize: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MetamorphicGrade: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MinCode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MinInt: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MinPotential: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MinStyle: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Months: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_MovementSense: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_OpenJointSets: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_OrientationPosition: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_OrientationQuality: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_OrientationType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Oxidation: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_OxidationStyle: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ParageneticStage: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ParentCode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Person: "&Code, Company, PersonType, SortOrder, rv",
				Lookup_PersonType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_PetrologyType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_PhotoClassification: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_PhotoLocationType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_PhotoType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_PlugMaterial: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ProgramCode: "&Code, DefaultProgramType, rv",
				Lookup_ProgramType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ProtolithCode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Provenance: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_PTSiteType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_QCGradeRange: "&Element,SortOrder, rv",
				Lookup_Region: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Relog: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ReportingClassification: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ReportingDatePeriod: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ReportingType: "&Code, Classification, CodeGroup, UnitCode, rv",
				Lookup_RigType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_RockMassFabric: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_RowStatus: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SampleClassification: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SampleCondition: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SampleMethod: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SamplePackingType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SampleTestType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SampleType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SGDryMethod: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SGMethod: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_ShearAspect: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Shift: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SiteMonitoringType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SitePrep: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SoilHorizon: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StandardSampleSourceType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StorageActivity: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StorageLocation: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Stratigraphy: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructAngleSet: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructClass: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructContinuity: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructFillTexture: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructFillThickness: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructFillType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructLineationType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructPlaneType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructPTMethod: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructPTQuality: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructRoughness: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructShape: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructSpacing: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructWallContactType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructWallRockCompetency: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_StructZone: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SubjRec: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SurveyMethod: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SurveyReliability: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_SynchStatus: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_TargetCode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_TargetType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_TaskPriority: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_TaskStatus: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_TaskType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_TenementStatus: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Terrain: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Units: "&UnitCode, UnitType,SortOrder, rv",
				Lookup_UnitType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_UserStatusType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Validation: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Vegetation: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_VeinCode: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_VeinStyle: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_VeinTexture: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Vergence: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_WaterIntersectionType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_WaterQuality: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_Weathering: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_WeathStyle: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_XRFBagType: "&Code, SortOrder, IsDefaultInd, rv",
				Lookup_YoungingIndicator: "&Code, SortOrder, IsDefaultInd, rv",

				Planning_DrillPattern: "&DrillPattern, DrillPatternCode, DrillPatternType, DrillProgram, Organization, Target, rv",
				Planning_DrillPlan: "&DrillPlanId, [Organization+Project+Prospect+Target+DrillPlanId], &DrillPlanId, DrillPattern, DrillType, Grid, HolePurpose, HolePurposeDetail, HoleType, Phase, Pit, PlannedBy, SubTarget, Tenement, Zone",
				Planning_DrillPlanStatusHistory: "&DrillPlanStatusHistoryId, DrillPlanId, TransitionOnDt, FromStatus, ToStatus",
				Planning_DrillProgram: "&DrillProgram, Contractor, Organization, ProgramCode, ProgramType, Project, RigType, Status, Tenement, rv",

				Processing_AssayBatch: "&LabCode, DispatchNo, LabJobDt, BatchStatus, rv",
				Processing_AssayBatchDetail: "&LabCode, Element, GenericMethod, UnitCode, BatchNo, rv",
				Processing_AssayBatchStatus: "&Code, SortOrder, IsDefaultInd, rv",
				Processing_AssayBatchStatusLog: "&AssayBatchStatusLogId, [LogDt+LabCode+BatchNo], rv",
				Processing_AssayElement: "&Element, ElementGroup, SystemUnits, rv",
				Processing_AssayElementGroup: "&ElementGroup, rv",
				Processing_AssayLab: "&LabCode, [LabCode+ActiveInd], &LabDescription, rv",
				Processing_AssayLabElementAlias: "&LabCode, Element, [LabCode+LabElement+Element], rv",
				Processing_AssayLabMethod: "&LabMethod, GenericMethod, LabCode, [LabMethod+LabCode+GenericMethod], ChargeWeightUnitCode, rv",
				Processing_AssayMethodGeneric: "&GenericMethod, rv",

				QAQC_QCAnalysisType: "&QCAnalysisTypeId, rv",
				QAQC_QCClassification: "&Code, &Description, [QCStageNo+OrderNo], QCGroup, rv",
				QAQC_QCFilteredset: "&QCFilteredsetId, [Element+ActiveInd], [FilterType+ActiveInd+EffectiveDt], [LabCode+ActiveInd], [Target+ActiveInd], rv",
				QAQC_QCGroup: "&Code, SortOrder, IsDefaultInd, rv",
				QAQC_QCInsertionRule: "&QCInsertionRuleId, Laboratory, rv",
				QAQC_QCInsertionRuleStandardSequence: "&QCInsertionRuleStandardSequenceId, [QCInsertionRuleId+SortOrder], StandardId, rv",
				QAQC_QCReference: "&StandardId, StandardType, rv",
				QAQC_QCReferenceType: "&Code, SortOrder, IsDefaultInd, rv",
				QAQC_QCReferenceValue: "&StandardId, [StandardId+Element+GenericMethod], [StandardId+Element+GenericMethod+Preferred], [StandardId+Element+Preferred], Units, ValueType, rv",
				QAQC_QCReferenceValueType: "&Code, SortOrder, IsDefaultInd, rv",
				QAQC_QCRule: "&Code, QCType, rv",
				QAQC_QCStatisticalLimits: "&Element, ElementGroup, rv",
				QAQC_QCType: "&Code, SortOrder, IsDefaultInd, rv",

				Sample: "&SampleId, CollarId, SampleNm, DepthFrom",

				// Sample_LabDispatch: '&LabDispatchId, CollarId, [Organization+DispatchedDt], DispatchStatus, &DispatchNumber',
				// Sample_PtSample: '&SampleId, [Organization+SampleId+SiteId], [Organization+SampleId], AssayDispatchGroup, LoggedBy, MeshSize, RowStatus, SampledBy, SampleType, SampleWeightUnitCode, SoilHorizon',
				// Sample_PtSampleQC: '&SampleId, [Organization+SampleId+OriginalSampleId], QCClassification, [Organization+SampleId], AssayDispatchGroup, LoggedBy, RowStatus, SampledBy, SampleType, SiteId',
				// Sample_Sample: '&SampleId, SampleClassification, SampleMethod, SampleType, [CollarId+SampledDt], [Organization+SampleClassification+CollarId+SampleId+DepthFrom], [Organization+SampleId], [Organization+CollarId+SampleId+DepthFrom], AssayDispatchGroup, Contamination, Grid, RowStatus, SampleAreaUnitCode, SampleCondition, SampleWeightUnitCode, Shift, SubjectiveRecovery',
				// Sample_SampleDispatch: '&SampleDispatchId, [CollarId+Organization], LabDispatchId, SampleId, [SampleId+LabDispatchId]',
				// Sample_SampleIndex: '&Organization',
				// Sample_SampleQC: '&SampleId, [SampledDt+QCClassification], [Organization+SampleId], AssayDispatchGroup, CollarId, HistoricSampleId, OriginalSampleId, RowStatus, SampleMethod, SampleType, SampleWeightUnitCode',
				// Sample_SampleRegister: '&Organization, LastLabDispatchId, [Organization+SampleNm], &SampleNm, RowStatus',
				// Sample_StandardSample: '&SampleId, StandardId, SampledDt, [Organization+SampleId], AssayDispatchGroup, EntityTypeId, SampleType',
				// Sample_StandardSampleQC: '&SampleId, [Organization+SampleId], AssayDispatchGroup, HistoricSampleId, LoggedBy, OriginalSampleId, QCClassification, RowStatus, StandardId',
				// Sample_XRFSample: '&SampleId, CollarId, SampleClassification, SampleMethod, SampleType, [Organization+CollarId+SampleId+DepthFrom], [Organization+SampleId], Grid, LoggedBy, RowStatus, SampleCondition, SampledBy, SampleWeightUnitCode',
				// Sample_XRFSampleQC: '&SampleId, [Organization+CollarId+DepthFrom], QCClassification, [SampleId+OriginalSampleId], [Organization+SampleId], LoggedBy, RowStatus, SampledBy, SampleMethod, SampleType',
				// Sample_XRFStandardSample: '&SampleId, StandardId, [Organization+SampleId], EntityTypeId, SampleType',

				SurfacePt_PtGeologyLog: "&Organization, SiteId,Alt_Code, Alt_Int, Alt_Style, Lith_Code, Lith_Colour_1, Lith_Colour_2, Lith_Colour_Tone, Lith_Grainsize, Lith_Structure, Lith_Texture, LoggedBy, Min_Code, Min_Style, PtLoggingEventId, RegoLithologyProfile, Sulph_Code, Sulph_Style, Vein_Code, Vein_Style, Weathering",
				SurfacePt_PtLoggingEvent: "&Organization,SiteId, LoggingEventType",
				SurfacePt_PtMagSusLog: "&Organization, SiteId,Instrument, InstrumentFactorCode, PtLoggingEventId, ReadBy, SampleType",
				SurfacePt_PtMappingLog: "&Organization,SiteId, Lith1Cd, MappedBy, MapSurface, PtLoggingEventId, StructureType",
				SurfacePt_Site: "&Organization, [Organization+SiteNm], Company, Geologist, MapSheet, ProgramType, SiteAreaUnitCode, SiteType, SynchStatus, Tenement, Terrain, ValidatedBy, Vegetation",
				SurfacePt_SiteCoordinate: "&SiteCoordinateId, Grid, Instrument, Organization, SiteId, SurveyBy, SurveyCompany, SurveyMethod",

				System_Config: "&ConfigId, &ConfigTypeCd, rv",
				System_LookUpNormalization: "&LookUpNormalizationId, CanonicalTerm, VariantTerm, [Domain+VariantTerm], [VariantTerm+Domain], rv",
				System_PickList: "&PickListId, ActiveInd, &PickListName, rv",
				System_PickListUser: "&PickListUserId, [PickListType+PickListTypeValue+PickListId], &PickListUserId, rv",
				System_PickListValue: "&PickListValueId, ActiveInd, [LookupType+LookupId], [LookupType+PickListId+LookupId], rv",
				System_Template: "&TemplateId, rv",

				syncMetadata: "++id, entityType, entityId, collarId, programId, isOffline, [entityType+isOffline]",
				lookupMetadata: "++id, key, value",
				test: "++id, key, value, syncStatus, ModifiedOnDt",
			},
		);

		// Define which tables should NOT be tracked (e.g., read-only lookups)
		const IGNORE_TABLES = ['lookups', 'appSettings'];
		interface Syncable {
			syncStatus?: number;
			ModifiedOnDt?: number;
		}

		this.tables.forEach(table => {
			if (IGNORE_TABLES.includes(table.name)) return;

			table.hook('creating', (primKey, obj, transaction) => {
				// If we've tagged the transaction as 'sync', don't set dirty flags
				const tx = (this as any).transaction;
				if (tx && tx.isSyncing) return;
				obj.syncStatus = 1;
				obj.ModifiedOnDt = Date.now();
			});

			table.hook('updating', (mods: Syncable, primKey, obj) => {
				const tx = (this as any).transaction;

				// 1. Explicit Bypass: Transaction is marked as a System Sync
				if (tx && tx.isSyncing) return;

				const keys = Object.keys(mods);
				if (keys.length === 1 && mods.syncStatus !== undefined) {
					return;
				}

				// 3. Actual Change: User or UI updated real data
				return {
					...mods,
					syncStatus: 1,
					ModifiedOnDt: Date.now()
				};
			});
		});

		/*  SAMPLE TO ADD  isSyncing = true*/
		// async pullTable(tableName, endpoint) {
		//   const data = await fetch(endpoint).then(r => r.json());
		//   await db.transaction('rw', db[tableName], async () => {
		//     // Dexie.currentTransaction is the actual object the hook looks at
		//     (Dexie.currentTransaction as any).isSyncing = true;
		//     // Now bulkPut will run, hooks will fire,
		//     // but they will see isSyncing === true and do nothing.
		//     await db[tableName].bulkPut(data.map(item => ({ ...item, syncStatus: 0 })));
		//   });
		// }


		// Lifecycle hooks
		this.on("ready", () => {
			this._isReady = true;
			console.log("[DB] ✅ B2GoldOfflineDBv2 ready - Version 2");
			console.log("[DB] 📊 Tables:", this.tables.map(t => t.name).join(", "));

			// Log table counts for debugging
			this.getTables();
		});

		this.on("populate", () => {
			console.log("[DB] 🌱 Initial database population (first open)");
		});

		this.on("blocked", () => {
			console.warn("[DB] ⚠️ Database upgrade blocked - close other tabs");
		});

		this.on("versionchange", (event) => {
			console.log("[DB] 🔄 Version change detected", event);
		});

	}

	/**
	 * Wait for database to be ready
	 * Resolves immediately if already ready, otherwise waits for ready event
	 */
	async waitForReady(): Promise<void> {
		if (this._isReady) {
			return;
		}

		return new Promise((resolve) => {
			const onReady = () => {
				this.on.ready.unsubscribe(onReady);
				resolve();
			};
			this.on.ready.subscribe(onReady, false);
		});
	}

	/**
	 * Helper to log table statistics
	 */
	private async getTables() {
		try {
			const collarsCount = await this.DrillHole_Collar.count();
			const drillPlansCount = await this.Planning_DrillPlan.count();
			const geologyCount = await this.Geology_GeologyCombinedLog.count();
			const surveysCount = await this.DrillHole_Survey.count();
			const surveyLogsCount = await this.DrillHole_SurveyLog.count();
			const metadataCount = await this.syncMetadata.count();

			console.log("[DB] 📈 Current data:", {
				collars: collarsCount,
				drillPlans: drillPlansCount,
				geologyCombinedLogs: geologyCount,
				surveys: surveysCount,
				surveyLogs: surveyLogsCount,
				syncMetadata: metadataCount,
			});
		}
		catch (error) {
			console.error("[DB] Error getting table counts:", error);
		}
	}

	/**
	 * Clear all data (for testing or logout)
	 */
	async clearAll(): Promise<void> {
		console.log("[DB] 🗑️ Clearing all data...");

		await Promise.all([
			this.DrillHole_Collar.clear(),
			this.Planning_DrillPlan.clear(),
			this.Geology_GeologyCombinedLog.clear(),
			this.DrillHole_Survey.clear(),
			this.DrillHole_SurveyLog.clear(),
			// this.coreRecoveryRunLogs.clear(),
			// this.geotechs.clear(),
			// this.samples.clear(),
			this.syncMetadata.clear(),
		]);

		console.log("[DB] ✅ All data cleared");
	}

	/**
	 * Get storage usage estimate
	 */
	async getStorageEstimate(): Promise<{ usage: number, quota: number, percentage: number }> {
		if ("storage" in navigator && "estimate" in navigator.storage) {
			const estimate = await navigator.storage.estimate();
			const usage = estimate.usage || 0;
			const quota = estimate.quota || 0;
			const percentage = quota > 0 ? (usage / quota) * 100 : 0;

			// console.log('[DB] 💾 Storage usage:', {
			// 	usage: `${(usage / 1024 / 1024).toFixed(2)} MB`,
			// 	quota: `${(quota / 1024 / 1024).toFixed(2)} MB`,
			// 	percentage: `${percentage.toFixed(2)}%`,
			// });

			return { usage, quota, percentage };
		}

		return { usage: 0, quota: 0, percentage: 0 };
	}
}

// Singleton instance removed to prevent duplicate database connections
// Use src/data/db/connection.ts instead
// export const db = new B2GoldOfflineDBv2();
console.log("[DB] 🏗️ B2GoldOfflineDBv2 schema loaded");
