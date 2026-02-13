/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  AddSamplesToDispatchRequestDto,
  AllSamples,
  ApplicationLog,
  ApplicationLogControllerFindAllParamsOrderEnum,
  Assay,
  AssayBatch,
  AssayBatchControllerFindAllParamsOrderEnum,
  AssayBatchDetail,
  AssayBatchDetailControllerFindAllParamsOrderEnum,
  AssayBatchStatus,
  AssayBatchStatusControllerFindAllParamsOrderEnum,
  AssayBatchStatusLog,
  AssayBatchStatusLogControllerFindAllParamsOrderEnum,
  AssayControllerFindAllParamsOrderEnum,
  AssayElement,
  AssayElementControllerFindAllParamsOrderEnum,
  AssayElementGroup,
  AssayElementGroupControllerFindAllParamsOrderEnum,
  AssayLab,
  AssayLabControllerFindAllParamsOrderEnum,
  AssayLabElementAlias,
  AssayLabElementAliasControllerFindAllParamsOrderEnum,
  AssayLabMethod,
  AssayLabMethodControllerFindAllParamsOrderEnum,
  AssayMethodGeneric,
  AssayMethodGenericControllerFindAllParamsOrderEnum,
  AvailableTransitionsDto,
  Collar,
  CollarControllerFindAllParamsOrderEnum,
  CollarCoordinate,
  CollarCoordinateControllerFindAllParamsOrderEnum,
  CollarHistory,
  CollarHistoryControllerFindAllParamsOrderEnum,
  Comment,
  CommentControllerFindAllParamsOrderEnum,
  Config,
  ConfigControllerFindAllParamsOrderEnum,
  CoreRecoveryRunLog,
  CoreRecoveryRunLogControllerFindAllParamsOrderEnum,
  CreateApplicationLogDto,
  CreateAssayBatchDetailDto,
  CreateAssayBatchDto,
  CreateAssayBatchStatusDto,
  CreateAssayBatchStatusLogDto,
  CreateAssayDto,
  CreateAssayElementDto,
  CreateAssayElementGroupDto,
  CreateAssayLabDto,
  CreateAssayLabElementAliasDto,
  CreateAssayLabMethodDto,
  CreateAssayMethodGenericDto,
  CreateCollarCoordinateDto,
  CreateCollarDto,
  CreateCollarHistoryDto,
  CreateCommentDto,
  CreateConfigDto,
  CreateCoreRecoveryRunLogDto,
  CreateCycloneCleaningDto,
  CreateDrillMethodDto,
  CreateDrillPatternDto,
  CreateDrillPlanDto,
  CreateDrillPlanStatusHistoryDto,
  CreateDrillProgramDto,
  CreateFractureCountLogDto,
  CreateGeologyCombinedLogDto,
  CreateHoleDto,
  CreateHoleNameDto,
  CreateHoleNmPrefixDto,
  CreateLabDispatchDto,
  CreateLabDispatchRequestDto,
  CreateLabDispatchResponseDto,
  CreateLoggingEventDto,
  CreateLookUpNormalizationDto,
  CreateMagSusLogDto,
  CreateMetaDataLogDto,
  CreateNotificationDto,
  CreateOrganizationDto,
  CreatePhaseDto,
  CreatePickListDto,
  CreatePickListUserDto,
  CreatePickListValueDto,
  CreatePitDto,
  CreatePivotedAssayResultsDto,
  CreatePivotedXrfResultDto,
  CreateProjectDto,
  CreateProspectDto,
  CreatePtSampleDto,
  CreatePtSampleQcDto,
  CreateQcAnalysisTypeDto,
  CreateQcClassificationDto,
  CreateQcFilteredsetDto,
  CreateQcGroupDto,
  CreateQcInsertionRuleDto,
  CreateQcInsertionRuleStandardSequenceDto,
  CreateQcReferenceDto,
  CreateQcReferenceTypeDto,
  CreateQcReferenceValueDto,
  CreateQcReferenceValueTypeDto,
  CreateQcRuleDto,
  CreateQcStatisticalLimitsDto,
  CreateQcTypeDto,
  CreateRigSetupDto,
  CreateRockMechanicLogDto,
  CreateRockQualityDesignationLogDto,
  CreateSampleDispatchDto,
  CreateSampleDto,
  CreateSampleIndexDto,
  CreateSampleQcDto,
  CreateSampleRegisterDto,
  CreateSectionDto,
  CreateSectionVersionDto,
  CreateShearLogDto,
  CreateSpecificGravityPtLogDto,
  CreateStandardSampleDto,
  CreateStandardSampleQcDto,
  CreateStructureLogDto,
  CreateStructurePtLogDto,
  CreateSubTargetDto,
  CreateSurveyDto,
  CreateSurveyLogDto,
  CreateTargetDto,
  CreateTemplateDto,
  CreateTenementDto,
  CreateUiAllSamplesDto,
  CreateUserDto,
  CreateValidationErrorDto,
  CreateVwCollarDto,
  CreateVwDrillPlanDto,
  CreateVwQuickDrillHoleDto,
  CreateVwQuickDrillPlanDto,
  CreateXrfDto,
  CreateXrfHeaderDto,
  CreateXrfSampleDto,
  CreateXrfSampleQcDto,
  CreateXrfStandardSampleDto,
  CreateZoneDto,
  CycloneCleaning,
  CycloneCleaningControllerFindAllParamsOrderEnum,
  DeleteLabDispatchRequestDto,
  DrillMethod,
  DrillMethodBase,
  DrillMethodControllerFindAllParamsOrderEnum,
  DrillPattern,
  DrillPatternControllerFindAllParamsOrderEnum,
  DrillPlan,
  DrillPlanControllerFindAllParamsOrderEnum,
  DrillPlanStatusHistory,
  DrillPlanStatusHistoryBase,
  DrillPlanStatusHistoryControllerFindAllParamsOrderEnum,
  DrillProgram,
  DrillProgramControllerFindAllParamsOrderEnum,
  FractureCountLog,
  FractureCountLogControllerFindAllParamsOrderEnum,
  GenerateDispatchNumberRequestDto,
  GenerateDispatchNumberResponseDto,
  GeologyCombinedLog,
  GeologyCombinedLogControllerFindAllParamsOrderEnum,
  GetLabDispatchByCollarRequestDto,
  GetSamplesForDispatchRequestDto,
  Hole,
  HoleControllerFindAllParamsOrderEnum,
  HoleName,
  HoleNameControllerFindAllParamsOrderEnum,
  HoleNmPrefix,
  HoleNmPrefixControllerFindAllParamsOrderEnum,
  LabDispatch,
  LabDispatchControllerFindAllParamsOrderEnum,
  LoggingEvent,
  LoggingEventControllerFindAllParamsOrderEnum,
  LoginDto,
  LoginResponseDto,
  LookUpNormalization,
  LookUpNormalizationControllerFindAllParamsOrderEnum,
  LookupTableResponse,
  MagSusLog,
  MagSusLogControllerFindAllParamsOrderEnum,
  MetaDataLog,
  MetaDataLogControllerFindAllParamsOrderEnum,
  Notification,
  NotificationControllerFindAllParamsOrderEnum,
  NotificationResponseDto,
  Organization,
  OrganizationControllerFindAllParamsOrderEnum,
  PageDto,
  Phase,
  PhaseControllerFindAllParamsOrderEnum,
  PickList,
  PickListControllerFindAllParamsOrderEnum,
  PickListUser,
  PickListUserControllerFindAllParamsOrderEnum,
  PickListValue,
  PickListValueControllerFindAllParamsOrderEnum,
  Pit,
  PitControllerFindAllParamsOrderEnum,
  PivotedAssayResults,
  PivotedAssayResultsControllerFindAllParamsOrderEnum,
  PivotedXrfResult,
  PivotedXrfResultControllerFindAllParamsOrderEnum,
  Project,
  ProjectControllerFindAllParamsOrderEnum,
  Prospect,
  ProspectControllerFindAllParamsOrderEnum,
  PtSample,
  PtSampleControllerFindAllParamsOrderEnum,
  PtSampleQc,
  PtSampleQcControllerFindAllParamsOrderEnum,
  QcAnalysisType,
  QcAnalysisTypeControllerFindAllParamsOrderEnum,
  QcClassification,
  QcClassificationControllerFindAllParamsOrderEnum,
  QcFilteredset,
  QcFilteredsetControllerFindAllParamsOrderEnum,
  QcGroup,
  QcGroupControllerFindAllParamsOrderEnum,
  QcInsertionRule,
  QcInsertionRuleControllerFindAllParamsOrderEnum,
  QcInsertionRuleStandardSequence,
  QcInsertionRuleStandardSequenceControllerFindAllParamsOrderEnum,
  QcReference,
  QcReferenceControllerFindAllParamsOrderEnum,
  QcReferenceType,
  QcReferenceTypeControllerFindAllParamsOrderEnum,
  QcReferenceValue,
  QcReferenceValueControllerFindAllParamsOrderEnum,
  QcReferenceValueType,
  QcReferenceValueTypeControllerFindAllParamsOrderEnum,
  QcRule,
  QcRuleControllerFindAllParamsOrderEnum,
  QcStatisticalLimits,
  QcStatisticalLimitsControllerFindAllParamsOrderEnum,
  QcType,
  QcTypeControllerFindAllParamsOrderEnum,
  ReadinessCheckResultDto,
  RefreshResponseDto,
  RefreshTokenDto,
  RigSetup,
  RigSetupControllerFindAllParamsOrderEnum,
  RockMechanicLog,
  RockMechanicLogControllerFindAllParamsOrderEnum,
  RockQualityDesignationLog,
  RockQualityDesignationLogControllerFindAllParamsOrderEnum,
  Sample,
  SampleControllerFindAllParamsOrderEnum,
  SampleDispatch,
  SampleDispatchControllerFindAllParamsOrderEnum,
  SampleIndex,
  SampleIndexControllerFindAllParamsOrderEnum,
  SampleQc,
  SampleQcControllerFindAllParamsOrderEnum,
  SampleRegister,
  SampleRegisterControllerFindAllParamsOrderEnum,
  SamplesAllControllerFindAllParamsOrderEnum,
  Section,
  SectionControllerFindAllParamsOrderEnum,
  SectionVersion,
  SectionVersionControllerFindAllParamsOrderEnum,
  SectionVersionDto,
  ShearLog,
  ShearLogControllerFindAllParamsOrderEnum,
  SpCalculateDuplicateRsd,
  SpCalculateDuplicateRsdControllerFindAllParamsOrderEnum,
  SpGetGlobalChartsRequestDto,
  SpGetGlobalChartsResponseDto,
  SpGetGradeRange,
  SpGetGradeRangeControllerFindAllParamsOrderEnum,
  SpGetHoleValidation,
  SpGetHoleValidationControllerFindAllParamsOrderEnum,
  SpGetHoleValidationEnhanced,
  SpGetHoleValidationEnhancedControllerFindAllParamsOrderEnum,
  SpGetLabDispatchByCollar,
  SpGetSamplesForDispatch,
  SpGlobalDashboardRequestDto,
  SpGlobalDashboardResponseDto,
  SpecificGravityPtLog,
  SpecificGravityPtLogControllerFindAllParamsOrderEnum,
  StandardSample,
  StandardSampleControllerFindAllParamsOrderEnum,
  StandardSampleQc,
  StandardSampleQcControllerFindAllParamsOrderEnum,
  StructureLog,
  StructureLogControllerFindAllParamsOrderEnum,
  StructurePtLog,
  StructurePtLogControllerFindAllParamsOrderEnum,
  SubTarget,
  SubTargetControllerFindAllParamsOrderEnum,
  Survey,
  SurveyControllerFindAllParamsOrderEnum,
  SurveyLog,
  SurveyLogControllerFindAllAuditLogsParamsOrderEnum,
  SurveyLogControllerFindAllParamsOrderEnum,
  SyncControllerHealthStatusEnum,
  SyncRequestDto,
  SyncResponseDto,
  SyncRvRequestDto,
  SyncRvResponseDto,
  Target,
  TargetControllerFindAllParamsOrderEnum,
  Template,
  TemplateControllerFindAllParamsOrderEnum,
  Tenement,
  TenementControllerFindAllParamsOrderEnum,
  TransitionStatusDto,
  UiAllSamples,
  UiAllSamplesControllerFindAllParamsOrderEnum,
  UiDrillHole,
  UiDrillHoleControllerFindAllParamsOrderEnum,
  UiDrillPlan,
  UiDrillPlanBase,
  UpdateAllSamplesDto,
  UpdateApplicationLogDto,
  UpdateAssayBatchDetailDto,
  UpdateAssayBatchDto,
  UpdateAssayBatchStatusDto,
  UpdateAssayBatchStatusLogDto,
  UpdateAssayDto,
  UpdateAssayElementDto,
  UpdateAssayElementGroupDto,
  UpdateAssayLabDto,
  UpdateAssayLabElementAliasDto,
  UpdateAssayLabMethodDto,
  UpdateAssayMethodGenericDto,
  UpdateCollarDto,
  UpdateCollarHistoryDto,
  UpdateCommentDto,
  UpdateConfigDto,
  UpdateCoreRecoveryRunLogDto,
  UpdateCycloneCleaningDto,
  UpdateDrillMethodDto,
  UpdateDrillPatternDto,
  UpdateDrillPlanStatusHistoryDto,
  UpdateDrillProgramDto,
  UpdateFractureCountLogDto,
  UpdateGeologyCombinedLogDto,
  UpdateHoleDto,
  UpdateHoleNameDto,
  UpdateHoleNmPrefixDto,
  UpdateLabDispatchDto,
  UpdateLabDispatchStatusRequestDto,
  UpdateLabDispatchStatusResponseDto,
  UpdateLoggingEventDto,
  UpdateLookUpNormalizationDto,
  UpdateMagSusLogDto,
  UpdateMetaDataLogDto,
  UpdateNotificationDto,
  UpdateOrganizationDto,
  UpdatePhaseDto,
  UpdatePickListDto,
  UpdatePickListUserDto,
  UpdatePickListValueDto,
  UpdatePitDto,
  UpdatePivotedAssayResultsDto,
  UpdatePivotedXrfResultDto,
  UpdateProjectDto,
  UpdateProspectDto,
  UpdatePtSampleDto,
  UpdatePtSampleQcDto,
  UpdateQcAnalysisTypeDto,
  UpdateQcClassificationDto,
  UpdateQcFilteredsetDto,
  UpdateQcGroupDto,
  UpdateQcInsertionRuleDto,
  UpdateQcInsertionRuleStandardSequenceDto,
  UpdateQcReferenceDto,
  UpdateQcReferenceTypeDto,
  UpdateQcReferenceValueDto,
  UpdateQcReferenceValueTypeDto,
  UpdateQcRuleDto,
  UpdateQcStatisticalLimitsDto,
  UpdateQcTypeDto,
  UpdateRigSetupDto,
  UpdateRockMechanicLogDto,
  UpdateRockQualityDesignationLogDto,
  UpdateSampleDispatchDto,
  UpdateSampleDto,
  UpdateSampleIndexDto,
  UpdateSampleQcDto,
  UpdateSampleRegisterDto,
  UpdateSectionDto,
  UpdateSectionStatusDto,
  UpdateSectionVersionDto,
  UpdateShearLogDto,
  UpdateSpecificGravityPtLogDto,
  UpdateStandardSampleDto,
  UpdateStandardSampleQcDto,
  UpdateStructureLogDto,
  UpdateStructurePtLogDto,
  UpdateSubTargetDto,
  UpdateSurveyDto,
  UpdateSurveyLogDto,
  UpdateTargetDto,
  UpdateTemplateDto,
  UpdateTenementDto,
  UpdateUiAllSamplesDto,
  UpdateUiDrillHoleDto,
  UpdateUserDto,
  UpdateValidationErrorDto,
  UpdateVwCollarDto,
  UpdateVwDrillPlanDto,
  UpdateVwQuickDrillHoleDto,
  UpdateVwQuickDrillPlanDto,
  UpdateXrfDto,
  UpdateXrfHeaderDto,
  UpdateXrfSampleDto,
  UpdateXrfSampleQcDto,
  UpdateXrfStandardSampleDto,
  UpdateZoneDto,
  UpsertCollarDto,
  UpsertGeologyCombinedLoggingDto,
  UpsertSurveyLogDto,
  User,
  UserControllerFindAllParamsOrderEnum,
  ValidationError,
  ValidationErrorControllerFindAllParamsOrderEnum,
  VwCollar,
  VwCollarControllerFindAllParamsOrderEnum,
  VwDrillPlan,
  VwDrillPlanControllerFindAllParamsOrderEnum,
  VwQuickDrillHole,
  VwQuickDrillHoleControllerFindAllParamsOrderEnum,
  VwQuickDrillPlan,
  VwQuickDrillPlanControllerFindAllParamsOrderEnum,
  Xrf,
  XrfControllerFindAllParamsOrderEnum,
  XrfHeader,
  XrfHeaderControllerFindAllParamsOrderEnum,
  XrfSample,
  XrfSampleControllerFindAllParamsOrderEnum,
  XrfSampleQc,
  XrfSampleQcControllerFindAllParamsOrderEnum,
  XrfStandardSample,
  XrfStandardSampleControllerFindAllParamsOrderEnum,
  Zone,
  ZoneControllerFindAllParamsOrderEnum,
} from "./data-contracts";

export namespace Api {
  /**
   * No description
   * @tags user
   * @name UserControllerCreate
   * @summary Create a new user
   * @request POST:/api/v1/user
   * @secure
   */
  export namespace UserControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = User;
  }

  /**
   * No description
   * @tags user
   * @name UserControllerFindAll
   * @summary Get all users with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/user
   * @secure
   */
  export namespace UserControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: UserControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: User[];
    };
  }

  /**
   * No description
   * @tags user
   * @name UserControllerFindOne
   * @summary Get a user by id
   * @request GET:/api/v1/user/{id}
   * @secure
   */
  export namespace UserControllerFindOne {
    export type RequestParams = {
      /** UserId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = User;
  }

  /**
   * No description
   * @tags user
   * @name UserControllerUpdate
   * @summary Update a user
   * @request PUT:/api/v1/user/{id}
   * @secure
   */
  export namespace UserControllerUpdate {
    export type RequestParams = {
      /** UserId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = User;
  }

  /**
   * No description
   * @tags user
   * @name UserControllerRemove
   * @summary Delete a user
   * @request DELETE:/api/v1/user/{id}
   * @secure
   */
  export namespace UserControllerRemove {
    export type RequestParams = {
      /** UserId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags authentication
   * @name AuthControllerLogin
   * @summary Login with username and password
   * @request POST:/api/v1/auth/login
   */
  export namespace AuthControllerLogin {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginDto;
    export type RequestHeaders = {};
    export type ResponseBody = LoginResponseDto;
  }

  /**
   * No description
   * @tags authentication
   * @name AuthControllerRefresh
   * @summary Refresh access token using refresh token
   * @request POST:/api/v1/auth/refresh
   */
  export namespace AuthControllerRefresh {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RefreshTokenDto;
    export type RequestHeaders = {};
    export type ResponseBody = RefreshResponseDto;
  }

  /**
   * No description
   * @tags authentication
   * @name AuthControllerGetLookUpTable
   * @summary Get all LookUp tables from cache
   * @request GET:/api/v1/auth/lookup-table2
   * @secure
   */
  export namespace AuthControllerGetLookUpTable {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = LookupTableResponse;
  }

  /**
   * No description
   * @tags authentication
   * @name AuthControllerGetLookUpTable2
   * @summary Get all LookUp tables from cache
   * @request GET:/api/v1/auth/lookup-table
   * @secure
   */
  export namespace AuthControllerGetLookUpTable2 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags authentication
   * @name AuthControllerGetUserInfo
   * @summary Get current user information
   * @request GET:/api/v1/auth/user-info
   * @secure
   */
  export namespace AuthControllerGetUserInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
      /** @example 1 */
      id?: number;
      /** @example "https://avatars.githubusercontent.com/u/47056890" */
      avatar?: string;
      /** @example "admin" */
      username?: string;
      /** @example "admin@example.com" */
      email?: string;
      /** @example "1234567890" */
      phoneNumber?: string;
      /** @example "manager" */
      description?: string;
      /** @example ["admin"] */
      roles?: string[];
    };
  }

  /**
   * No description
   * @tags holeNmPrefix
   * @name HoleNmPrefixControllerCreate
   * @summary Create a new holeNmPrefix
   * @request POST:/api/v1/hole-nm-prefix
   * @secure
   */
  export namespace HoleNmPrefixControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateHoleNmPrefixDto;
    export type RequestHeaders = {};
    export type ResponseBody = HoleNmPrefix;
  }

  /**
   * No description
   * @tags holeNmPrefix
   * @name HoleNmPrefixControllerFindAll
   * @summary Get all holeNmPrefixs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/hole-nm-prefix
   * @secure
   */
  export namespace HoleNmPrefixControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: HoleNmPrefixControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: HoleNmPrefix[];
    };
  }

  /**
   * No description
   * @tags holeNmPrefix
   * @name HoleNmPrefixControllerFindOne
   * @summary Get a holeNmPrefix by id
   * @request GET:/api/v1/hole-nm-prefix/{id}
   * @secure
   */
  export namespace HoleNmPrefixControllerFindOne {
    export type RequestParams = {
      /** HoleNmPrefixId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = HoleNmPrefix;
  }

  /**
   * No description
   * @tags holeNmPrefix
   * @name HoleNmPrefixControllerUpdate
   * @summary Update a holeNmPrefix
   * @request PUT:/api/v1/hole-nm-prefix/{id}
   * @secure
   */
  export namespace HoleNmPrefixControllerUpdate {
    export type RequestParams = {
      /** HoleNmPrefixId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateHoleNmPrefixDto;
    export type RequestHeaders = {};
    export type ResponseBody = HoleNmPrefix;
  }

  /**
   * No description
   * @tags holeNmPrefix
   * @name HoleNmPrefixControllerRemove
   * @summary Delete a holeNmPrefix
   * @request DELETE:/api/v1/hole-nm-prefix/{id}
   * @secure
   */
  export namespace HoleNmPrefixControllerRemove {
    export type RequestParams = {
      /** HoleNmPrefixId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags organization
   * @name OrganizationControllerCreate
   * @summary Create a new organization
   * @request POST:/api/v1/organization
   * @secure
   */
  export namespace OrganizationControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateOrganizationDto;
    export type RequestHeaders = {};
    export type ResponseBody = Organization;
  }

  /**
   * No description
   * @tags organization
   * @name OrganizationControllerFindAll
   * @summary Get all organizations with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/organization
   * @secure
   */
  export namespace OrganizationControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: OrganizationControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Organization[];
    };
  }

  /**
   * No description
   * @tags organization
   * @name OrganizationControllerFindOne
   * @summary Get a organization by id
   * @request GET:/api/v1/organization/{id}
   * @secure
   */
  export namespace OrganizationControllerFindOne {
    export type RequestParams = {
      /** OrganizationId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Organization;
  }

  /**
   * No description
   * @tags organization
   * @name OrganizationControllerUpdate
   * @summary Update a organization
   * @request PUT:/api/v1/organization/{id}
   * @secure
   */
  export namespace OrganizationControllerUpdate {
    export type RequestParams = {
      /** OrganizationId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateOrganizationDto;
    export type RequestHeaders = {};
    export type ResponseBody = Organization;
  }

  /**
   * No description
   * @tags organization
   * @name OrganizationControllerRemove
   * @summary Delete a organization
   * @request DELETE:/api/v1/organization/{id}
   * @secure
   */
  export namespace OrganizationControllerRemove {
    export type RequestParams = {
      /** OrganizationId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags phase
   * @name PhaseControllerCreate
   * @summary Create a new phase
   * @request POST:/api/v1/phase
   * @secure
   */
  export namespace PhaseControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreatePhaseDto;
    export type RequestHeaders = {};
    export type ResponseBody = Phase;
  }

  /**
   * No description
   * @tags phase
   * @name PhaseControllerFindAll
   * @summary Get all phases with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/phase
   * @secure
   */
  export namespace PhaseControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: PhaseControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Phase[];
    };
  }

  /**
   * No description
   * @tags phase
   * @name PhaseControllerFindOne
   * @summary Get a phase by id
   * @request GET:/api/v1/phase/{id}
   * @secure
   */
  export namespace PhaseControllerFindOne {
    export type RequestParams = {
      /** PhaseId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Phase;
  }

  /**
   * No description
   * @tags phase
   * @name PhaseControllerUpdate
   * @summary Update a phase
   * @request PUT:/api/v1/phase/{id}
   * @secure
   */
  export namespace PhaseControllerUpdate {
    export type RequestParams = {
      /** PhaseId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePhaseDto;
    export type RequestHeaders = {};
    export type ResponseBody = Phase;
  }

  /**
   * No description
   * @tags phase
   * @name PhaseControllerRemove
   * @summary Delete a phase
   * @request DELETE:/api/v1/phase/{id}
   * @secure
   */
  export namespace PhaseControllerRemove {
    export type RequestParams = {
      /** PhaseId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags pit
   * @name PitControllerCreate
   * @summary Create a new pit
   * @request POST:/api/v1/pit
   * @secure
   */
  export namespace PitControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreatePitDto;
    export type RequestHeaders = {};
    export type ResponseBody = Pit;
  }

  /**
   * No description
   * @tags pit
   * @name PitControllerFindAll
   * @summary Get all pits with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pit
   * @secure
   */
  export namespace PitControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: PitControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Pit[];
    };
  }

  /**
   * No description
   * @tags pit
   * @name PitControllerFindOne
   * @summary Get a pit by id
   * @request GET:/api/v1/pit/{id}
   * @secure
   */
  export namespace PitControllerFindOne {
    export type RequestParams = {
      /** PitId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Pit;
  }

  /**
   * No description
   * @tags pit
   * @name PitControllerUpdate
   * @summary Update a pit
   * @request PUT:/api/v1/pit/{id}
   * @secure
   */
  export namespace PitControllerUpdate {
    export type RequestParams = {
      /** PitId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePitDto;
    export type RequestHeaders = {};
    export type ResponseBody = Pit;
  }

  /**
   * No description
   * @tags pit
   * @name PitControllerRemove
   * @summary Delete a pit
   * @request DELETE:/api/v1/pit/{id}
   * @secure
   */
  export namespace PitControllerRemove {
    export type RequestParams = {
      /** PitId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags project
   * @name ProjectControllerCreate
   * @summary Create a new project
   * @request POST:/api/v1/project
   * @secure
   */
  export namespace ProjectControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateProjectDto;
    export type RequestHeaders = {};
    export type ResponseBody = Project;
  }

  /**
   * No description
   * @tags project
   * @name ProjectControllerFindAll
   * @summary Get all projects with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/project
   * @secure
   */
  export namespace ProjectControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: ProjectControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Project[];
    };
  }

  /**
   * No description
   * @tags project
   * @name ProjectControllerFindOne
   * @summary Get a project by id
   * @request GET:/api/v1/project/{id}
   * @secure
   */
  export namespace ProjectControllerFindOne {
    export type RequestParams = {
      /** ProjectId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Project;
  }

  /**
   * No description
   * @tags project
   * @name ProjectControllerUpdate
   * @summary Update a project
   * @request PUT:/api/v1/project/{id}
   * @secure
   */
  export namespace ProjectControllerUpdate {
    export type RequestParams = {
      /** ProjectId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateProjectDto;
    export type RequestHeaders = {};
    export type ResponseBody = Project;
  }

  /**
   * No description
   * @tags project
   * @name ProjectControllerRemove
   * @summary Delete a project
   * @request DELETE:/api/v1/project/{id}
   * @secure
   */
  export namespace ProjectControllerRemove {
    export type RequestParams = {
      /** ProjectId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags prospect
   * @name ProspectControllerCreate
   * @summary Create a new prospect
   * @request POST:/api/v1/prospect
   * @secure
   */
  export namespace ProspectControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateProspectDto;
    export type RequestHeaders = {};
    export type ResponseBody = Prospect;
  }

  /**
   * No description
   * @tags prospect
   * @name ProspectControllerFindAll
   * @summary Get all prospects with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/prospect
   * @secure
   */
  export namespace ProspectControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: ProspectControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Prospect[];
    };
  }

  /**
   * No description
   * @tags prospect
   * @name ProspectControllerFindOne
   * @summary Get a prospect by id
   * @request GET:/api/v1/prospect/{id}
   * @secure
   */
  export namespace ProspectControllerFindOne {
    export type RequestParams = {
      /** ProspectId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Prospect;
  }

  /**
   * No description
   * @tags prospect
   * @name ProspectControllerUpdate
   * @summary Update a prospect
   * @request PUT:/api/v1/prospect/{id}
   * @secure
   */
  export namespace ProspectControllerUpdate {
    export type RequestParams = {
      /** ProspectId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateProspectDto;
    export type RequestHeaders = {};
    export type ResponseBody = Prospect;
  }

  /**
   * No description
   * @tags prospect
   * @name ProspectControllerRemove
   * @summary Delete a prospect
   * @request DELETE:/api/v1/prospect/{id}
   * @secure
   */
  export namespace ProspectControllerRemove {
    export type RequestParams = {
      /** ProspectId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags section
   * @name SectionControllerCreate
   * @summary Create a new section
   * @request POST:/api/v1/section
   * @secure
   */
  export namespace SectionControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateSectionDto;
    export type RequestHeaders = {};
    export type ResponseBody = Section;
  }

  /**
   * No description
   * @tags section
   * @name SectionControllerFindAll
   * @summary Get all sections with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/section
   * @secure
   */
  export namespace SectionControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SectionControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Section[];
    };
  }

  /**
   * No description
   * @tags section
   * @name SectionControllerFindOne
   * @summary Get a section by id
   * @request GET:/api/v1/section/{id}
   * @secure
   */
  export namespace SectionControllerFindOne {
    export type RequestParams = {
      /** SectionId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Section;
  }

  /**
   * No description
   * @tags section
   * @name SectionControllerUpdate
   * @summary Update a section
   * @request PUT:/api/v1/section/{id}
   * @secure
   */
  export namespace SectionControllerUpdate {
    export type RequestParams = {
      /** SectionId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSectionDto;
    export type RequestHeaders = {};
    export type ResponseBody = Section;
  }

  /**
   * No description
   * @tags section
   * @name SectionControllerRemove
   * @summary Delete a section
   * @request DELETE:/api/v1/section/{id}
   * @secure
   */
  export namespace SectionControllerRemove {
    export type RequestParams = {
      /** SectionId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags subTarget
   * @name SubTargetControllerCreate
   * @summary Create a new subTarget
   * @request POST:/api/v1/sub-target
   * @secure
   */
  export namespace SubTargetControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateSubTargetDto;
    export type RequestHeaders = {};
    export type ResponseBody = SubTarget;
  }

  /**
   * No description
   * @tags subTarget
   * @name SubTargetControllerFindAll
   * @summary Get all subTargets with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sub-target
   * @secure
   */
  export namespace SubTargetControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SubTargetControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: SubTarget[];
    };
  }

  /**
   * No description
   * @tags subTarget
   * @name SubTargetControllerFindOne
   * @summary Get a subTarget by id
   * @request GET:/api/v1/sub-target/{id}
   * @secure
   */
  export namespace SubTargetControllerFindOne {
    export type RequestParams = {
      /** SubTargetId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SubTarget;
  }

  /**
   * No description
   * @tags subTarget
   * @name SubTargetControllerUpdate
   * @summary Update a subTarget
   * @request PUT:/api/v1/sub-target/{id}
   * @secure
   */
  export namespace SubTargetControllerUpdate {
    export type RequestParams = {
      /** SubTargetId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSubTargetDto;
    export type RequestHeaders = {};
    export type ResponseBody = SubTarget;
  }

  /**
   * No description
   * @tags subTarget
   * @name SubTargetControllerRemove
   * @summary Delete a subTarget
   * @request DELETE:/api/v1/sub-target/{id}
   * @secure
   */
  export namespace SubTargetControllerRemove {
    export type RequestParams = {
      /** SubTargetId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags target
   * @name TargetControllerCreate
   * @summary Create a new target
   * @request POST:/api/v1/target
   * @secure
   */
  export namespace TargetControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateTargetDto;
    export type RequestHeaders = {};
    export type ResponseBody = Target;
  }

  /**
   * No description
   * @tags target
   * @name TargetControllerFindAll
   * @summary Get all targets with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/target
   * @secure
   */
  export namespace TargetControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: TargetControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Target[];
    };
  }

  /**
   * No description
   * @tags target
   * @name TargetControllerFindOne
   * @summary Get a target by id
   * @request GET:/api/v1/target/{id}
   * @secure
   */
  export namespace TargetControllerFindOne {
    export type RequestParams = {
      /** TargetId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Target;
  }

  /**
   * No description
   * @tags target
   * @name TargetControllerUpdate
   * @summary Update a target
   * @request PUT:/api/v1/target/{id}
   * @secure
   */
  export namespace TargetControllerUpdate {
    export type RequestParams = {
      /** TargetId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateTargetDto;
    export type RequestHeaders = {};
    export type ResponseBody = Target;
  }

  /**
   * No description
   * @tags target
   * @name TargetControllerRemove
   * @summary Delete a target
   * @request DELETE:/api/v1/target/{id}
   * @secure
   */
  export namespace TargetControllerRemove {
    export type RequestParams = {
      /** TargetId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags tenement
   * @name TenementControllerCreate
   * @summary Create a new tenement
   * @request POST:/api/v1/tenement
   * @secure
   */
  export namespace TenementControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateTenementDto;
    export type RequestHeaders = {};
    export type ResponseBody = Tenement;
  }

  /**
   * No description
   * @tags tenement
   * @name TenementControllerFindAll
   * @summary Get all tenements with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/tenement
   * @secure
   */
  export namespace TenementControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: TenementControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Tenement[];
    };
  }

  /**
   * No description
   * @tags tenement
   * @name TenementControllerFindOne
   * @summary Get a tenement by id
   * @request GET:/api/v1/tenement/{id}
   * @secure
   */
  export namespace TenementControllerFindOne {
    export type RequestParams = {
      /** TenementId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Tenement;
  }

  /**
   * No description
   * @tags tenement
   * @name TenementControllerUpdate
   * @summary Update a tenement
   * @request PUT:/api/v1/tenement/{id}
   * @secure
   */
  export namespace TenementControllerUpdate {
    export type RequestParams = {
      /** TenementId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateTenementDto;
    export type RequestHeaders = {};
    export type ResponseBody = Tenement;
  }

  /**
   * No description
   * @tags tenement
   * @name TenementControllerRemove
   * @summary Delete a tenement
   * @request DELETE:/api/v1/tenement/{id}
   * @secure
   */
  export namespace TenementControllerRemove {
    export type RequestParams = {
      /** TenementId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags zone
   * @name ZoneControllerCreate
   * @summary Create a new zone
   * @request POST:/api/v1/zone
   * @secure
   */
  export namespace ZoneControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateZoneDto;
    export type RequestHeaders = {};
    export type ResponseBody = Zone;
  }

  /**
   * No description
   * @tags zone
   * @name ZoneControllerFindAll
   * @summary Get all zones with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/zone
   * @secure
   */
  export namespace ZoneControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: ZoneControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Zone[];
    };
  }

  /**
   * No description
   * @tags zone
   * @name ZoneControllerFindOne
   * @summary Get a zone by id
   * @request GET:/api/v1/zone/{id}
   * @secure
   */
  export namespace ZoneControllerFindOne {
    export type RequestParams = {
      /** ZoneId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Zone;
  }

  /**
   * No description
   * @tags zone
   * @name ZoneControllerUpdate
   * @summary Update a zone
   * @request PUT:/api/v1/zone/{id}
   * @secure
   */
  export namespace ZoneControllerUpdate {
    export type RequestParams = {
      /** ZoneId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateZoneDto;
    export type RequestHeaders = {};
    export type ResponseBody = Zone;
  }

  /**
   * No description
   * @tags zone
   * @name ZoneControllerRemove
   * @summary Delete a zone
   * @request DELETE:/api/v1/zone/{id}
   * @secure
   */
  export namespace ZoneControllerRemove {
    export type RequestParams = {
      /** ZoneId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags collar
   * @name CollarControllerCreate
   * @summary Create a new collar
   * @request POST:/api/v1/collar
   * @secure
   */
  export namespace CollarControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateCollarDto;
    export type RequestHeaders = {};
    export type ResponseBody = Collar;
  }

  /**
   * No description
   * @tags collar
   * @name CollarControllerFindAll
   * @summary Get all collars with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/collar
   * @secure
   */
  export namespace CollarControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: CollarControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Collar[];
    };
  }

  /**
   * No description
   * @tags collar
   * @name CollarControllerFindOne
   * @summary Get a collar by id
   * @request GET:/api/v1/collar/{id}
   * @secure
   */
  export namespace CollarControllerFindOne {
    export type RequestParams = {
      /** CollarId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Collar;
  }

  /**
   * No description
   * @tags collar
   * @name CollarControllerUpdate
   * @summary Update a collar
   * @request PUT:/api/v1/collar/{id}
   * @secure
   */
  export namespace CollarControllerUpdate {
    export type RequestParams = {
      /** CollarId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateCollarDto;
    export type RequestHeaders = {};
    export type ResponseBody = Collar;
  }

  /**
   * No description
   * @tags collar
   * @name CollarControllerRemove
   * @summary Delete a collar
   * @request DELETE:/api/v1/collar/{id}
   * @secure
   */
  export namespace CollarControllerRemove {
    export type RequestParams = {
      /** CollarId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags collar
   * @name CollarControllerUpsert
   * @summary Upsert Collar with LoggingEvent handling
   * @request POST:/api/v1/collar/upsert
   * @secure
   */
  export namespace CollarControllerUpsert {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpsertCollarDto;
    export type RequestHeaders = {};
    export type ResponseBody = Collar;
  }

  /**
   * @description Updates audit/action columns (RowStatus, ValidationStatus, ReportIncludeInd, ActiveInd, ValidationErrors) for all records in a specified section that belong to this drill hole. **Returns the actual updated section records**, not the Collar entity. Supports sections like: Sample, SurveyLog, GeologyCombinedLog, DrillMethod, RigSetup, and 25+ more. The update is performed in a transaction and audit fields (ModifiedBy, ModifiedOnDt) are automatically populated. **Example:** - PATCH /collar/A60FE3BC-AFF4-4D7D-9C29-0003DAD75E1B/section/sample/status - Body: { "RowStatus": 2, "ValidationStatus": 1, "ActiveInd": true } - Returns: Array of updated Sample records
   * @tags collar
   * @name CollarControllerUpdateSectionStatus
   * @summary Update status fields for section records
   * @request PATCH:/api/v1/collar/{id}/section/{sectionKey}/status
   * @secure
   */
  export namespace CollarControllerUpdateSectionStatus {
    export type RequestParams = {
      /** CollarId (UUID) */
      id: string;
      /**
       * Section name (e.g., Sample, SurveyLog, GeologyCombinedLog, DrillMethod, RigSetup)
       * @example "Sample"
       */
      sectionKey: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSectionStatusDto;
    export type RequestHeaders = {};
    export type ResponseBody = object[];
  }

  /**
   * No description
   * @tags loggingEvent
   * @name LoggingEventControllerCreate
   * @summary Create a new loggingEvent
   * @request POST:/api/v1/logging-event
   * @secure
   */
  export namespace LoggingEventControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateLoggingEventDto;
    export type RequestHeaders = {};
    export type ResponseBody = LoggingEvent;
  }

  /**
   * No description
   * @tags loggingEvent
   * @name LoggingEventControllerFindAll
   * @summary Get all loggingEvents with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/logging-event
   * @secure
   */
  export namespace LoggingEventControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: LoggingEventControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: LoggingEvent[];
    };
  }

  /**
   * No description
   * @tags loggingEvent
   * @name LoggingEventControllerFindOne
   * @summary Get a loggingEvent by id
   * @request GET:/api/v1/logging-event/{id}
   * @secure
   */
  export namespace LoggingEventControllerFindOne {
    export type RequestParams = {
      /** LoggingEventId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = LoggingEvent;
  }

  /**
   * No description
   * @tags loggingEvent
   * @name LoggingEventControllerUpdate
   * @summary Update a loggingEvent
   * @request PUT:/api/v1/logging-event/{id}
   * @secure
   */
  export namespace LoggingEventControllerUpdate {
    export type RequestParams = {
      /** LoggingEventId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateLoggingEventDto;
    export type RequestHeaders = {};
    export type ResponseBody = LoggingEvent;
  }

  /**
   * No description
   * @tags loggingEvent
   * @name LoggingEventControllerRemove
   * @summary Delete a loggingEvent
   * @request DELETE:/api/v1/logging-event/{id}
   * @secure
   */
  export namespace LoggingEventControllerRemove {
    export type RequestParams = {
      /** LoggingEventId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags collarCoordinate
   * @name CollarCoordinateControllerCreate
   * @summary Create a new collarCoordinate
   * @request POST:/api/v1/collar-coordinate
   * @secure
   */
  export namespace CollarCoordinateControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateCollarCoordinateDto;
    export type RequestHeaders = {};
    export type ResponseBody = CollarCoordinate;
  }

  /**
   * No description
   * @tags collarCoordinate
   * @name CollarCoordinateControllerFindAll
   * @summary Get all collarCoordinates with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/collar-coordinate
   * @secure
   */
  export namespace CollarCoordinateControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: CollarCoordinateControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: CollarCoordinate[];
    };
  }

  /**
   * No description
   * @tags collarCoordinate
   * @name CollarCoordinateControllerFindOne
   * @summary Get a collarCoordinate by id
   * @request GET:/api/v1/collar-coordinate/{id}
   * @secure
   */
  export namespace CollarCoordinateControllerFindOne {
    export type RequestParams = {
      /** CollarCoordinateId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CollarCoordinate;
  }

  /**
   * No description
   * @tags collarHistory
   * @name CollarHistoryControllerCreate
   * @summary Create a new collarHistory
   * @request POST:/api/v1/collar-history
   * @secure
   */
  export namespace CollarHistoryControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateCollarHistoryDto;
    export type RequestHeaders = {};
    export type ResponseBody = CollarHistory;
  }

  /**
   * No description
   * @tags collarHistory
   * @name CollarHistoryControllerFindAll
   * @summary Get all collarHistorys with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/collar-history
   * @secure
   */
  export namespace CollarHistoryControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: CollarHistoryControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: CollarHistory[];
    };
  }

  /**
   * No description
   * @tags collarHistory
   * @name CollarHistoryControllerFindOne
   * @summary Get a collarHistory by id
   * @request GET:/api/v1/collar-history/{id}
   * @secure
   */
  export namespace CollarHistoryControllerFindOne {
    export type RequestParams = {
      /** CollarHistoryId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CollarHistory;
  }

  /**
   * No description
   * @tags collarHistory
   * @name CollarHistoryControllerUpdate
   * @summary Update a collarHistory
   * @request PUT:/api/v1/collar-history/{id}
   * @secure
   */
  export namespace CollarHistoryControllerUpdate {
    export type RequestParams = {
      /** CollarHistoryId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateCollarHistoryDto;
    export type RequestHeaders = {};
    export type ResponseBody = CollarHistory;
  }

  /**
   * No description
   * @tags collarHistory
   * @name CollarHistoryControllerRemove
   * @summary Delete a collarHistory
   * @request DELETE:/api/v1/collar-history/{id}
   * @secure
   */
  export namespace CollarHistoryControllerRemove {
    export type RequestParams = {
      /** CollarHistoryId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags comment
   * @name CommentControllerCreate
   * @summary Create a new comment
   * @request POST:/api/v1/comment
   * @secure
   */
  export namespace CommentControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateCommentDto;
    export type RequestHeaders = {};
    export type ResponseBody = Comment;
  }

  /**
   * No description
   * @tags comment
   * @name CommentControllerFindAll
   * @summary Get all comments with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/comment
   * @secure
   */
  export namespace CommentControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: CommentControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Comment[];
    };
  }

  /**
   * No description
   * @tags comment
   * @name CommentControllerFindOne
   * @summary Get a comment by id
   * @request GET:/api/v1/comment/{id}
   * @secure
   */
  export namespace CommentControllerFindOne {
    export type RequestParams = {
      /** CommentId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Comment;
  }

  /**
   * No description
   * @tags comment
   * @name CommentControllerUpdate
   * @summary Update a comment
   * @request PUT:/api/v1/comment/{id}
   * @secure
   */
  export namespace CommentControllerUpdate {
    export type RequestParams = {
      /** CommentId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateCommentDto;
    export type RequestHeaders = {};
    export type ResponseBody = Comment;
  }

  /**
   * No description
   * @tags comment
   * @name CommentControllerRemove
   * @summary Delete a comment
   * @request DELETE:/api/v1/comment/{id}
   * @secure
   */
  export namespace CommentControllerRemove {
    export type RequestParams = {
      /** CommentId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags cycloneCleaning
   * @name CycloneCleaningControllerCreate
   * @summary Create a new cycloneCleaning
   * @request POST:/api/v1/cyclone-cleaning
   * @secure
   */
  export namespace CycloneCleaningControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateCycloneCleaningDto;
    export type RequestHeaders = {};
    export type ResponseBody = CycloneCleaning;
  }

  /**
   * No description
   * @tags cycloneCleaning
   * @name CycloneCleaningControllerFindAll
   * @summary Get all cycloneCleanings with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/cyclone-cleaning
   * @secure
   */
  export namespace CycloneCleaningControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: CycloneCleaningControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: CycloneCleaning[];
    };
  }

  /**
   * No description
   * @tags cycloneCleaning
   * @name CycloneCleaningControllerFindOne
   * @summary Get a cycloneCleaning by id
   * @request GET:/api/v1/cyclone-cleaning/{id}
   * @secure
   */
  export namespace CycloneCleaningControllerFindOne {
    export type RequestParams = {
      /** CycloneCleaningId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CycloneCleaning;
  }

  /**
   * No description
   * @tags cycloneCleaning
   * @name CycloneCleaningControllerUpdate
   * @summary Update a cycloneCleaning
   * @request PUT:/api/v1/cyclone-cleaning/{id}
   * @secure
   */
  export namespace CycloneCleaningControllerUpdate {
    export type RequestParams = {
      /** CycloneCleaningId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateCycloneCleaningDto;
    export type RequestHeaders = {};
    export type ResponseBody = CycloneCleaning;
  }

  /**
   * No description
   * @tags cycloneCleaning
   * @name CycloneCleaningControllerRemove
   * @summary Delete a cycloneCleaning
   * @request DELETE:/api/v1/cyclone-cleaning/{id}
   * @secure
   */
  export namespace CycloneCleaningControllerRemove {
    export type RequestParams = {
      /** CycloneCleaningId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags drillMethod
   * @name DrillMethodControllerCreate
   * @summary Create a new drillMethod
   * @request POST:/api/v1/drill-method
   * @secure
   */
  export namespace DrillMethodControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateDrillMethodDto;
    export type RequestHeaders = {};
    export type ResponseBody = DrillMethod;
  }

  /**
   * No description
   * @tags drillMethod
   * @name DrillMethodControllerFindAll
   * @summary Get all drillMethods with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/drill-method
   * @secure
   */
  export namespace DrillMethodControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: DrillMethodControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: DrillMethod[];
    };
  }

  /**
   * No description
   * @tags drillMethod
   * @name DrillMethodControllerFindOne
   * @summary Get a drillMethod by id
   * @request GET:/api/v1/drill-method/{id}
   * @secure
   */
  export namespace DrillMethodControllerFindOne {
    export type RequestParams = {
      /** DrillMethodId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DrillMethod;
  }

  /**
   * No description
   * @tags drillMethod
   * @name DrillMethodControllerUpdate
   * @summary Update a drillMethod
   * @request PUT:/api/v1/drill-method/{id}
   * @secure
   */
  export namespace DrillMethodControllerUpdate {
    export type RequestParams = {
      /** DrillMethodId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateDrillMethodDto;
    export type RequestHeaders = {};
    export type ResponseBody = DrillMethod;
  }

  /**
   * No description
   * @tags drillMethod
   * @name DrillMethodControllerRemove
   * @summary Delete a drillMethod
   * @request DELETE:/api/v1/drill-method/{id}
   * @secure
   */
  export namespace DrillMethodControllerRemove {
    export type RequestParams = {
      /** DrillMethodId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags drillMethod
   * @name DrillMethodControllerBulkUpsert
   * @summary Bulk upsert DrillMethod records without LoggingEvent
   * @request POST:/api/v1/drill-method/bulk-upsert
   * @secure
   */
  export namespace DrillMethodControllerBulkUpsert {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DrillMethodBase[];
    export type RequestHeaders = {};
    export type ResponseBody = DrillMethod[];
  }

  /**
   * No description
   * @tags hole
   * @name HoleControllerCreate
   * @summary Create a new hole
   * @request POST:/api/v1/hole
   * @secure
   */
  export namespace HoleControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateHoleDto;
    export type RequestHeaders = {};
    export type ResponseBody = Hole;
  }

  /**
   * No description
   * @tags hole
   * @name HoleControllerFindAll
   * @summary Get all holes with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/hole
   * @secure
   */
  export namespace HoleControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: HoleControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Hole[];
    };
  }

  /**
   * No description
   * @tags hole
   * @name HoleControllerFindOne
   * @summary Get a hole by id
   * @request GET:/api/v1/hole/{id}
   * @secure
   */
  export namespace HoleControllerFindOne {
    export type RequestParams = {
      /** HoleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Hole;
  }

  /**
   * No description
   * @tags hole
   * @name HoleControllerUpdate
   * @summary Update a hole
   * @request PUT:/api/v1/hole/{id}
   * @secure
   */
  export namespace HoleControllerUpdate {
    export type RequestParams = {
      /** HoleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateHoleDto;
    export type RequestHeaders = {};
    export type ResponseBody = Hole;
  }

  /**
   * No description
   * @tags hole
   * @name HoleControllerRemove
   * @summary Delete a hole
   * @request DELETE:/api/v1/hole/{id}
   * @secure
   */
  export namespace HoleControllerRemove {
    export type RequestParams = {
      /** HoleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags holeName
   * @name HoleNameControllerCreate
   * @summary Create a new holeName
   * @request POST:/api/v1/hole-name
   * @secure
   */
  export namespace HoleNameControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateHoleNameDto;
    export type RequestHeaders = {};
    export type ResponseBody = HoleName;
  }

  /**
   * No description
   * @tags holeName
   * @name HoleNameControllerFindAll
   * @summary Get all holeNames with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/hole-name
   * @secure
   */
  export namespace HoleNameControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: HoleNameControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: HoleName[];
    };
  }

  /**
   * No description
   * @tags holeName
   * @name HoleNameControllerFindOne
   * @summary Get a holeName by id
   * @request GET:/api/v1/hole-name/{id}
   * @secure
   */
  export namespace HoleNameControllerFindOne {
    export type RequestParams = {
      /** HoleNameId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = HoleName;
  }

  /**
   * No description
   * @tags holeName
   * @name HoleNameControllerUpdate
   * @summary Update a holeName
   * @request PUT:/api/v1/hole-name/{id}
   * @secure
   */
  export namespace HoleNameControllerUpdate {
    export type RequestParams = {
      /** HoleNameId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateHoleNameDto;
    export type RequestHeaders = {};
    export type ResponseBody = HoleName;
  }

  /**
   * No description
   * @tags holeName
   * @name HoleNameControllerRemove
   * @summary Delete a holeName
   * @request DELETE:/api/v1/hole-name/{id}
   * @secure
   */
  export namespace HoleNameControllerRemove {
    export type RequestParams = {
      /** HoleNameId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags metaDataLog
   * @name MetaDataLogControllerCreate
   * @summary Create a new metaDataLog
   * @request POST:/api/v1/meta-data-log
   * @secure
   */
  export namespace MetaDataLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateMetaDataLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = MetaDataLog;
  }

  /**
   * No description
   * @tags metaDataLog
   * @name MetaDataLogControllerFindAll
   * @summary Get all metaDataLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/meta-data-log
   * @secure
   */
  export namespace MetaDataLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: MetaDataLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: MetaDataLog[];
    };
  }

  /**
   * No description
   * @tags metaDataLog
   * @name MetaDataLogControllerFindOne
   * @summary Get a metaDataLog by id
   * @request GET:/api/v1/meta-data-log/{id}
   * @secure
   */
  export namespace MetaDataLogControllerFindOne {
    export type RequestParams = {
      /** MetaDataLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MetaDataLog;
  }

  /**
   * No description
   * @tags metaDataLog
   * @name MetaDataLogControllerUpdate
   * @summary Update a metaDataLog
   * @request PUT:/api/v1/meta-data-log/{id}
   * @secure
   */
  export namespace MetaDataLogControllerUpdate {
    export type RequestParams = {
      /** MetaDataLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateMetaDataLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = MetaDataLog;
  }

  /**
   * No description
   * @tags metaDataLog
   * @name MetaDataLogControllerRemove
   * @summary Delete a metaDataLog
   * @request DELETE:/api/v1/meta-data-log/{id}
   * @secure
   */
  export namespace MetaDataLogControllerRemove {
    export type RequestParams = {
      /** MetaDataLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags rigSetup
   * @name RigSetupControllerCreate
   * @summary Create a new rigSetup
   * @request POST:/api/v1/rig-setup
   * @secure
   */
  export namespace RigSetupControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateRigSetupDto;
    export type RequestHeaders = {};
    export type ResponseBody = RigSetup;
  }

  /**
   * No description
   * @tags rigSetup
   * @name RigSetupControllerFindAll
   * @summary Get all rigSetups with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/rig-setup
   * @secure
   */
  export namespace RigSetupControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: RigSetupControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: RigSetup[];
    };
  }

  /**
   * No description
   * @tags rigSetup
   * @name RigSetupControllerFindOne
   * @summary Get a rigSetup by id
   * @request GET:/api/v1/rig-setup/{id}
   * @secure
   */
  export namespace RigSetupControllerFindOne {
    export type RequestParams = {
      /** RigSetupId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RigSetup;
  }

  /**
   * No description
   * @tags rigSetup
   * @name RigSetupControllerUpdate
   * @summary Update a rigSetup
   * @request PUT:/api/v1/rig-setup/{id}
   * @secure
   */
  export namespace RigSetupControllerUpdate {
    export type RequestParams = {
      /** RigSetupId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateRigSetupDto;
    export type RequestHeaders = {};
    export type ResponseBody = RigSetup;
  }

  /**
   * No description
   * @tags rigSetup
   * @name RigSetupControllerRemove
   * @summary Delete a rigSetup
   * @request DELETE:/api/v1/rig-setup/{id}
   * @secure
   */
  export namespace RigSetupControllerRemove {
    export type RequestParams = {
      /** RigSetupId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags sectionVersion
   * @name SectionVersionControllerCreate
   * @summary Create a new sectionVersion
   * @request POST:/api/v1/section-version
   * @secure
   */
  export namespace SectionVersionControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateSectionVersionDto;
    export type RequestHeaders = {};
    export type ResponseBody = SectionVersion;
  }

  /**
   * No description
   * @tags sectionVersion
   * @name SectionVersionControllerFindAll
   * @summary Get all sectionVersions with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/section-version
   * @secure
   */
  export namespace SectionVersionControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SectionVersionControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: SectionVersion[];
    };
  }

  /**
   * No description
   * @tags sectionVersion
   * @name SectionVersionControllerFindOne
   * @summary Get a sectionVersion by id
   * @request GET:/api/v1/section-version/{id}
   * @secure
   */
  export namespace SectionVersionControllerFindOne {
    export type RequestParams = {
      /** SectionVersionId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SectionVersion;
  }

  /**
   * No description
   * @tags sectionVersion
   * @name SectionVersionControllerUpdate
   * @summary Update a sectionVersion
   * @request PUT:/api/v1/section-version/{id}
   * @secure
   */
  export namespace SectionVersionControllerUpdate {
    export type RequestParams = {
      /** SectionVersionId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSectionVersionDto;
    export type RequestHeaders = {};
    export type ResponseBody = SectionVersion;
  }

  /**
   * No description
   * @tags sectionVersion
   * @name SectionVersionControllerRemove
   * @summary Delete a sectionVersion
   * @request DELETE:/api/v1/section-version/{id}
   * @secure
   */
  export namespace SectionVersionControllerRemove {
    export type RequestParams = {
      /** SectionVersionId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags survey
   * @name SurveyControllerCreate
   * @summary Create a new survey
   * @request POST:/api/v1/survey
   * @secure
   */
  export namespace SurveyControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateSurveyDto;
    export type RequestHeaders = {};
    export type ResponseBody = Survey;
  }

  /**
   * No description
   * @tags survey
   * @name SurveyControllerFindAll
   * @summary Get all surveys with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/survey
   * @secure
   */
  export namespace SurveyControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SurveyControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Survey[];
    };
  }

  /**
   * No description
   * @tags survey
   * @name SurveyControllerFindOne
   * @summary Get a survey by id
   * @request GET:/api/v1/survey/{id}
   * @secure
   */
  export namespace SurveyControllerFindOne {
    export type RequestParams = {
      /** SurveyId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Survey;
  }

  /**
   * No description
   * @tags survey
   * @name SurveyControllerUpdate
   * @summary Update a survey
   * @request PUT:/api/v1/survey/{id}
   * @secure
   */
  export namespace SurveyControllerUpdate {
    export type RequestParams = {
      /** SurveyId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSurveyDto;
    export type RequestHeaders = {};
    export type ResponseBody = Survey;
  }

  /**
   * No description
   * @tags survey
   * @name SurveyControllerRemove
   * @summary Delete a survey
   * @request DELETE:/api/v1/survey/{id}
   * @secure
   */
  export namespace SurveyControllerRemove {
    export type RequestParams = {
      /** SurveyId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags surveyLog
   * @name SurveyLogControllerCreate
   * @summary Create a new surveyLog
   * @request POST:/api/v1/survey-log
   * @secure
   */
  export namespace SurveyLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateSurveyLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = SurveyLog;
  }

  /**
   * No description
   * @tags surveyLog
   * @name SurveyLogControllerFindAll
   * @summary Get all surveyLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/survey-log
   * @secure
   */
  export namespace SurveyLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SurveyLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: SurveyLog[];
    };
  }

  /**
   * No description
   * @tags surveyLog
   * @name SurveyLogControllerFindOne
   * @summary Get a surveyLog by id
   * @request GET:/api/v1/survey-log/{id}
   * @secure
   */
  export namespace SurveyLogControllerFindOne {
    export type RequestParams = {
      /** SurveyLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SurveyLog;
  }

  /**
   * No description
   * @tags surveyLog
   * @name SurveyLogControllerUpdate
   * @summary Update a surveyLog
   * @request PUT:/api/v1/survey-log/{id}
   * @secure
   */
  export namespace SurveyLogControllerUpdate {
    export type RequestParams = {
      /** SurveyLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSurveyLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = SurveyLog;
  }

  /**
   * No description
   * @tags surveyLog
   * @name SurveyLogControllerRemove
   * @summary Delete a surveyLog
   * @request DELETE:/api/v1/survey-log/{id}
   * @secure
   */
  export namespace SurveyLogControllerRemove {
    export type RequestParams = {
      /** SurveyLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags surveyLog
   * @name SurveyLogControllerBulkUpsert
   * @summary Bulk upsert survey logs with chunking and transaction management
   * @request POST:/api/v1/survey-log/bulk-upsert
   * @secure
   */
  export namespace SurveyLogControllerBulkUpsert {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpsertSurveyLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = SurveyLog[];
  }

  /**
   * No description
   * @tags surveyLog
   * @name SurveyLogControllerFindAllAuditLogs
   * @summary Get all survey log audit logs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/survey-log/audit-logs
   * @secure
   */
  export namespace SurveyLogControllerFindAllAuditLogs {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SurveyLogControllerFindAllAuditLogsParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: SurveyLog[];
    };
  }

  /**
   * No description
   * @tags surveyLog
   * @name SurveyLogControllerFindOneAuditLog
   * @summary Get a survey log audit log by id
   * @request GET:/api/v1/survey-log/audit-logs/{id}
   * @secure
   */
  export namespace SurveyLogControllerFindOneAuditLog {
    export type RequestParams = {
      /** SurveyLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SurveyLog;
  }

  /**
   * No description
   * @tags validationError
   * @name ValidationErrorControllerCreate
   * @summary Create a new validationError
   * @request POST:/api/v1/validation-error
   * @secure
   */
  export namespace ValidationErrorControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateValidationErrorDto;
    export type RequestHeaders = {};
    export type ResponseBody = ValidationError;
  }

  /**
   * No description
   * @tags validationError
   * @name ValidationErrorControllerFindAll
   * @summary Get all validationErrors with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/validation-error
   * @secure
   */
  export namespace ValidationErrorControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: ValidationErrorControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: ValidationError[];
    };
  }

  /**
   * No description
   * @tags validationError
   * @name ValidationErrorControllerFindOne
   * @summary Get a validationError by id
   * @request GET:/api/v1/validation-error/{id}
   * @secure
   */
  export namespace ValidationErrorControllerFindOne {
    export type RequestParams = {
      /** ValidationErrorId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ValidationError;
  }

  /**
   * No description
   * @tags validationError
   * @name ValidationErrorControllerUpdate
   * @summary Update a validationError
   * @request PUT:/api/v1/validation-error/{id}
   * @secure
   */
  export namespace ValidationErrorControllerUpdate {
    export type RequestParams = {
      /** ValidationErrorId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateValidationErrorDto;
    export type RequestHeaders = {};
    export type ResponseBody = ValidationError;
  }

  /**
   * No description
   * @tags validationError
   * @name ValidationErrorControllerRemove
   * @summary Delete a validationError
   * @request DELETE:/api/v1/validation-error/{id}
   * @secure
   */
  export namespace ValidationErrorControllerRemove {
    export type RequestParams = {
      /** ValidationErrorId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags drillPattern
   * @name DrillPatternControllerCreate
   * @summary Create a new drillPattern
   * @request POST:/api/v1/drill-pattern
   * @secure
   */
  export namespace DrillPatternControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateDrillPatternDto;
    export type RequestHeaders = {};
    export type ResponseBody = DrillPattern;
  }

  /**
   * No description
   * @tags drillPattern
   * @name DrillPatternControllerFindAll
   * @summary Get all drillPatterns with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/drill-pattern
   * @secure
   */
  export namespace DrillPatternControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: DrillPatternControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: DrillPattern[];
    };
  }

  /**
   * No description
   * @tags drillPattern
   * @name DrillPatternControllerFindOne
   * @summary Get a drillPattern by id
   * @request GET:/api/v1/drill-pattern/{id}
   * @secure
   */
  export namespace DrillPatternControllerFindOne {
    export type RequestParams = {
      /** DrillPatternId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DrillPattern;
  }

  /**
   * No description
   * @tags drillPattern
   * @name DrillPatternControllerUpdate
   * @summary Update a drillPattern
   * @request PUT:/api/v1/drill-pattern/{id}
   * @secure
   */
  export namespace DrillPatternControllerUpdate {
    export type RequestParams = {
      /** DrillPatternId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateDrillPatternDto;
    export type RequestHeaders = {};
    export type ResponseBody = DrillPattern;
  }

  /**
   * No description
   * @tags drillPattern
   * @name DrillPatternControllerRemove
   * @summary Delete a drillPattern
   * @request DELETE:/api/v1/drill-pattern/{id}
   * @secure
   */
  export namespace DrillPatternControllerRemove {
    export type RequestParams = {
      /** DrillPatternId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags drillPlan
   * @name DrillPlanControllerCreate
   * @summary Create a new drillPlan
   * @request POST:/api/v1/drill-plan
   * @secure
   */
  export namespace DrillPlanControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateDrillPlanDto;
    export type RequestHeaders = {};
    export type ResponseBody = UiDrillPlanBase;
  }

  /**
   * No description
   * @tags drillPlan
   * @name DrillPlanControllerFindAll
   * @summary Get all drillPlans with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/drill-plan
   * @secure
   */
  export namespace DrillPlanControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: DrillPlanControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: DrillPlan[];
    };
  }

  /**
   * No description
   * @tags drillPlan
   * @name DrillPlanControllerUpsert
   * @summary Create a new drillPlan
   * @request POST:/api/v1/drill-plan/upsert
   * @secure
   */
  export namespace DrillPlanControllerUpsert {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UiDrillPlan;
    export type RequestHeaders = {};
    export type ResponseBody = UiDrillPlanBase;
  }

  /**
   * No description
   * @tags drillPlan
   * @name DrillPlanControllerFindOne
   * @summary Get a drillPlan by id
   * @request GET:/api/v1/drill-plan/{id}
   * @secure
   */
  export namespace DrillPlanControllerFindOne {
    export type RequestParams = {
      /** DrillPlanId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UiDrillPlanBase;
  }

  /**
   * No description
   * @tags drillPlan
   * @name DrillPlanControllerUpdate
   * @summary Update a drillPlan
   * @request PUT:/api/v1/drill-plan/{id}
   * @secure
   */
  export namespace DrillPlanControllerUpdate {
    export type RequestParams = {
      /** DrillPlanId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UiDrillPlan;
    export type RequestHeaders = {};
    export type ResponseBody = UiDrillPlanBase;
  }

  /**
   * @description Validates state machine rules, permissions, and readiness checks before transitioning
   * @tags drillPlan
   * @name DrillPlanControllerTransitionStatus
   * @summary Transition drill plan to a new status
   * @request POST:/api/v1/drill-plan/{id}/transition
   * @secure
   */
  export namespace DrillPlanControllerTransitionStatus {
    export type RequestParams = {
      /** DrillPlanId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = TransitionStatusDto;
    export type RequestHeaders = {};
    export type ResponseBody = UiDrillPlan;
  }

  /**
   * @description Returns list of statuses the plan can transition to based on current status and user role
   * @tags drillPlan
   * @name DrillPlanControllerGetAvailableTransitions
   * @summary Get available status transitions for a drill plan
   * @request GET:/api/v1/drill-plan/{id}/available-transitions
   * @secure
   */
  export namespace DrillPlanControllerGetAvailableTransitions {
    export type RequestParams = {
      /** DrillPlanId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AvailableTransitionsDto;
  }

  /**
   * @description Validates if the drill plan meets all requirements for the target status
   * @tags drillPlan
   * @name DrillPlanControllerCheckReadiness
   * @summary Check readiness for a specific status transition
   * @request GET:/api/v1/drill-plan/{id}/readiness/{toStatus}
   * @secure
   */
  export namespace DrillPlanControllerCheckReadiness {
    export type RequestParams = {
      /** DrillPlanId (UUID) */
      id: string;
      /** Target status to check readiness for */
      toStatus: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ReadinessCheckResultDto;
  }

  /**
   * @description Returns chronological list of all status changes with metadata
   * @tags drillPlan
   * @name DrillPlanControllerGetStatusHistory
   * @summary Get status transition history for a drill plan
   * @request GET:/api/v1/drill-plan/{id}/status-history
   * @secure
   */
  export namespace DrillPlanControllerGetStatusHistory {
    export type RequestParams = {
      /** DrillPlanId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DrillPlanStatusHistoryBase[];
  }

  /**
   * No description
   * @tags drillPlanStatusHistory
   * @name DrillPlanStatusHistoryControllerCreate
   * @summary Create a new drillPlanStatusHistory
   * @request POST:/api/v1/drill-plan-status-history
   * @secure
   */
  export namespace DrillPlanStatusHistoryControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateDrillPlanStatusHistoryDto;
    export type RequestHeaders = {};
    export type ResponseBody = DrillPlanStatusHistory;
  }

  /**
   * No description
   * @tags drillPlanStatusHistory
   * @name DrillPlanStatusHistoryControllerFindAll
   * @summary Get all drillPlanStatusHistorys with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/drill-plan-status-history
   * @secure
   */
  export namespace DrillPlanStatusHistoryControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: DrillPlanStatusHistoryControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: DrillPlanStatusHistory[];
    };
  }

  /**
   * No description
   * @tags drillPlanStatusHistory
   * @name DrillPlanStatusHistoryControllerFindOne
   * @summary Get a drillPlanStatusHistory by id
   * @request GET:/api/v1/drill-plan-status-history/{id}
   * @secure
   */
  export namespace DrillPlanStatusHistoryControllerFindOne {
    export type RequestParams = {
      /** DrillPlanStatusHistoryId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DrillPlanStatusHistory;
  }

  /**
   * No description
   * @tags drillPlanStatusHistory
   * @name DrillPlanStatusHistoryControllerUpdate
   * @summary Update a drillPlanStatusHistory
   * @request PUT:/api/v1/drill-plan-status-history/{id}
   * @secure
   */
  export namespace DrillPlanStatusHistoryControllerUpdate {
    export type RequestParams = {
      /** DrillPlanStatusHistoryId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateDrillPlanStatusHistoryDto;
    export type RequestHeaders = {};
    export type ResponseBody = DrillPlanStatusHistory;
  }

  /**
   * No description
   * @tags drillPlanStatusHistory
   * @name DrillPlanStatusHistoryControllerRemove
   * @summary Delete a drillPlanStatusHistory
   * @request DELETE:/api/v1/drill-plan-status-history/{id}
   * @secure
   */
  export namespace DrillPlanStatusHistoryControllerRemove {
    export type RequestParams = {
      /** DrillPlanStatusHistoryId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags drillProgram
   * @name DrillProgramControllerCreate
   * @summary Create a new drillProgram
   * @request POST:/api/v1/drill-program
   * @secure
   */
  export namespace DrillProgramControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateDrillProgramDto;
    export type RequestHeaders = {};
    export type ResponseBody = DrillProgram;
  }

  /**
   * No description
   * @tags drillProgram
   * @name DrillProgramControllerFindAll
   * @summary Get all drillPrograms with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/drill-program
   * @secure
   */
  export namespace DrillProgramControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: DrillProgramControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: DrillProgram[];
    };
  }

  /**
   * No description
   * @tags drillProgram
   * @name DrillProgramControllerFindOne
   * @summary Get a drillProgram by id
   * @request GET:/api/v1/drill-program/{id}
   * @secure
   */
  export namespace DrillProgramControllerFindOne {
    export type RequestParams = {
      /** DrillProgramId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DrillProgram;
  }

  /**
   * No description
   * @tags drillProgram
   * @name DrillProgramControllerUpdate
   * @summary Update a drillProgram
   * @request PUT:/api/v1/drill-program/{id}
   * @secure
   */
  export namespace DrillProgramControllerUpdate {
    export type RequestParams = {
      /** DrillProgramId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateDrillProgramDto;
    export type RequestHeaders = {};
    export type ResponseBody = DrillProgram;
  }

  /**
   * No description
   * @tags drillProgram
   * @name DrillProgramControllerRemove
   * @summary Delete a drillProgram
   * @request DELETE:/api/v1/drill-program/{id}
   * @secure
   */
  export namespace DrillProgramControllerRemove {
    export type RequestParams = {
      /** DrillProgramId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags geologyCombinedLog
   * @name GeologyCombinedLogControllerCreate
   * @summary Create a new geologyCombinedLog
   * @request POST:/api/v1/geology-combined-log
   * @secure
   */
  export namespace GeologyCombinedLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateGeologyCombinedLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = GeologyCombinedLog;
  }

  /**
   * No description
   * @tags geologyCombinedLog
   * @name GeologyCombinedLogControllerFindAll
   * @summary Get all geologyCombinedLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/geology-combined-log
   * @secure
   */
  export namespace GeologyCombinedLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: GeologyCombinedLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: GeologyCombinedLog[];
    };
  }

  /**
   * No description
   * @tags geologyCombinedLog
   * @name GeologyCombinedLogControllerFindOne
   * @summary Get a geologyCombinedLog by id
   * @request GET:/api/v1/geology-combined-log/{id}
   * @secure
   */
  export namespace GeologyCombinedLogControllerFindOne {
    export type RequestParams = {
      /** GeologyCombinedLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GeologyCombinedLog;
  }

  /**
   * No description
   * @tags geologyCombinedLog
   * @name GeologyCombinedLogControllerUpdate
   * @summary Update a geologyCombinedLog
   * @request PUT:/api/v1/geology-combined-log/{id}
   * @secure
   */
  export namespace GeologyCombinedLogControllerUpdate {
    export type RequestParams = {
      /** GeologyCombinedLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateGeologyCombinedLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = GeologyCombinedLog;
  }

  /**
   * No description
   * @tags geologyCombinedLog
   * @name GeologyCombinedLogControllerRemove
   * @summary Delete a geologyCombinedLog
   * @request DELETE:/api/v1/geology-combined-log/{id}
   * @secure
   */
  export namespace GeologyCombinedLogControllerRemove {
    export type RequestParams = {
      /** GeologyCombinedLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags geologyCombinedLog
   * @name GeologyCombinedLogControllerUpsert
   * @summary Upsert UiGeologyCombinedLogSheet with GeologyCombinedLog records (single record)
   * @request POST:/api/v1/geology-combined-log/upsert
   * @secure
   */
  export namespace GeologyCombinedLogControllerUpsert {
    export type RequestParams = {};
    export type RequestQuery = {
      action?: string;
    };
    export type RequestBody = UpsertGeologyCombinedLoggingDto;
    export type RequestHeaders = {};
    export type ResponseBody = GeologyCombinedLog[];
  }

  /**
   * No description
   * @tags shearLog
   * @name ShearLogControllerCreate
   * @summary Create a new shearLog
   * @request POST:/api/v1/shear-log
   * @secure
   */
  export namespace ShearLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateShearLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = ShearLog;
  }

  /**
   * No description
   * @tags shearLog
   * @name ShearLogControllerFindAll
   * @summary Get all shearLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/shear-log
   * @secure
   */
  export namespace ShearLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: ShearLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: ShearLog[];
    };
  }

  /**
   * No description
   * @tags shearLog
   * @name ShearLogControllerFindOne
   * @summary Get a shearLog by id
   * @request GET:/api/v1/shear-log/{id}
   * @secure
   */
  export namespace ShearLogControllerFindOne {
    export type RequestParams = {
      /** ShearLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ShearLog;
  }

  /**
   * No description
   * @tags shearLog
   * @name ShearLogControllerUpdate
   * @summary Update a shearLog
   * @request PUT:/api/v1/shear-log/{id}
   * @secure
   */
  export namespace ShearLogControllerUpdate {
    export type RequestParams = {
      /** ShearLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateShearLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = ShearLog;
  }

  /**
   * No description
   * @tags shearLog
   * @name ShearLogControllerRemove
   * @summary Delete a shearLog
   * @request DELETE:/api/v1/shear-log/{id}
   * @secure
   */
  export namespace ShearLogControllerRemove {
    export type RequestParams = {
      /** ShearLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags structureLog
   * @name StructureLogControllerCreate
   * @summary Create a new structureLog
   * @request POST:/api/v1/structure-log
   * @secure
   */
  export namespace StructureLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateStructureLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = StructureLog;
  }

  /**
   * No description
   * @tags structureLog
   * @name StructureLogControllerFindAll
   * @summary Get all structureLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/structure-log
   * @secure
   */
  export namespace StructureLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: StructureLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: StructureLog[];
    };
  }

  /**
   * No description
   * @tags structureLog
   * @name StructureLogControllerFindOne
   * @summary Get a structureLog by id
   * @request GET:/api/v1/structure-log/{id}
   * @secure
   */
  export namespace StructureLogControllerFindOne {
    export type RequestParams = {
      /** StructureLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = StructureLog;
  }

  /**
   * No description
   * @tags structureLog
   * @name StructureLogControllerUpdate
   * @summary Update a structureLog
   * @request PUT:/api/v1/structure-log/{id}
   * @secure
   */
  export namespace StructureLogControllerUpdate {
    export type RequestParams = {
      /** StructureLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateStructureLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = StructureLog;
  }

  /**
   * No description
   * @tags structureLog
   * @name StructureLogControllerRemove
   * @summary Delete a structureLog
   * @request DELETE:/api/v1/structure-log/{id}
   * @secure
   */
  export namespace StructureLogControllerRemove {
    export type RequestParams = {
      /** StructureLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags structurePtLog
   * @name StructurePtLogControllerCreate
   * @summary Create a new structurePtLog
   * @request POST:/api/v1/structure-pt-log
   * @secure
   */
  export namespace StructurePtLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateStructurePtLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = StructurePtLog;
  }

  /**
   * No description
   * @tags structurePtLog
   * @name StructurePtLogControllerFindAll
   * @summary Get all structurePtLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/structure-pt-log
   * @secure
   */
  export namespace StructurePtLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: StructurePtLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: StructurePtLog[];
    };
  }

  /**
   * No description
   * @tags structurePtLog
   * @name StructurePtLogControllerFindOne
   * @summary Get a structurePtLog by id
   * @request GET:/api/v1/structure-pt-log/{id}
   * @secure
   */
  export namespace StructurePtLogControllerFindOne {
    export type RequestParams = {
      /** StructurePtLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = StructurePtLog;
  }

  /**
   * No description
   * @tags structurePtLog
   * @name StructurePtLogControllerUpdate
   * @summary Update a structurePtLog
   * @request PUT:/api/v1/structure-pt-log/{id}
   * @secure
   */
  export namespace StructurePtLogControllerUpdate {
    export type RequestParams = {
      /** StructurePtLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateStructurePtLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = StructurePtLog;
  }

  /**
   * No description
   * @tags structurePtLog
   * @name StructurePtLogControllerRemove
   * @summary Delete a structurePtLog
   * @request DELETE:/api/v1/structure-pt-log/{id}
   * @secure
   */
  export namespace StructurePtLogControllerRemove {
    export type RequestParams = {
      /** StructurePtLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags coreRecoveryRunLog
   * @name CoreRecoveryRunLogControllerCreate
   * @summary Create a new coreRecoveryRunLog
   * @request POST:/api/v1/core-recovery-run-log
   * @secure
   */
  export namespace CoreRecoveryRunLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateCoreRecoveryRunLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = CoreRecoveryRunLog;
  }

  /**
   * No description
   * @tags coreRecoveryRunLog
   * @name CoreRecoveryRunLogControllerFindAll
   * @summary Get all coreRecoveryRunLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/core-recovery-run-log
   * @secure
   */
  export namespace CoreRecoveryRunLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: CoreRecoveryRunLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: CoreRecoveryRunLog[];
    };
  }

  /**
   * No description
   * @tags coreRecoveryRunLog
   * @name CoreRecoveryRunLogControllerFindOne
   * @summary Get a coreRecoveryRunLog by id
   * @request GET:/api/v1/core-recovery-run-log/{id}
   * @secure
   */
  export namespace CoreRecoveryRunLogControllerFindOne {
    export type RequestParams = {
      /** CoreRecoveryRunLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CoreRecoveryRunLog;
  }

  /**
   * No description
   * @tags coreRecoveryRunLog
   * @name CoreRecoveryRunLogControllerUpdate
   * @summary Update a coreRecoveryRunLog
   * @request PUT:/api/v1/core-recovery-run-log/{id}
   * @secure
   */
  export namespace CoreRecoveryRunLogControllerUpdate {
    export type RequestParams = {
      /** CoreRecoveryRunLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateCoreRecoveryRunLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = CoreRecoveryRunLog;
  }

  /**
   * No description
   * @tags coreRecoveryRunLog
   * @name CoreRecoveryRunLogControllerRemove
   * @summary Delete a coreRecoveryRunLog
   * @request DELETE:/api/v1/core-recovery-run-log/{id}
   * @secure
   */
  export namespace CoreRecoveryRunLogControllerRemove {
    export type RequestParams = {
      /** CoreRecoveryRunLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags fractureCountLog
   * @name FractureCountLogControllerCreate
   * @summary Create a new fractureCountLog
   * @request POST:/api/v1/fracture-count-log
   * @secure
   */
  export namespace FractureCountLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateFractureCountLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = FractureCountLog;
  }

  /**
   * No description
   * @tags fractureCountLog
   * @name FractureCountLogControllerFindAll
   * @summary Get all fractureCountLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/fracture-count-log
   * @secure
   */
  export namespace FractureCountLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: FractureCountLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: FractureCountLog[];
    };
  }

  /**
   * No description
   * @tags fractureCountLog
   * @name FractureCountLogControllerFindOne
   * @summary Get a fractureCountLog by id
   * @request GET:/api/v1/fracture-count-log/{id}
   * @secure
   */
  export namespace FractureCountLogControllerFindOne {
    export type RequestParams = {
      /** FractureCountLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FractureCountLog;
  }

  /**
   * No description
   * @tags fractureCountLog
   * @name FractureCountLogControllerUpdate
   * @summary Update a fractureCountLog
   * @request PUT:/api/v1/fracture-count-log/{id}
   * @secure
   */
  export namespace FractureCountLogControllerUpdate {
    export type RequestParams = {
      /** FractureCountLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateFractureCountLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = FractureCountLog;
  }

  /**
   * No description
   * @tags fractureCountLog
   * @name FractureCountLogControllerRemove
   * @summary Delete a fractureCountLog
   * @request DELETE:/api/v1/fracture-count-log/{id}
   * @secure
   */
  export namespace FractureCountLogControllerRemove {
    export type RequestParams = {
      /** FractureCountLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags magSusLog
   * @name MagSusLogControllerCreate
   * @summary Create a new magSusLog
   * @request POST:/api/v1/mag-sus-log
   * @secure
   */
  export namespace MagSusLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateMagSusLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = MagSusLog;
  }

  /**
   * No description
   * @tags magSusLog
   * @name MagSusLogControllerFindAll
   * @summary Get all magSusLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/mag-sus-log
   * @secure
   */
  export namespace MagSusLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: MagSusLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: MagSusLog[];
    };
  }

  /**
   * No description
   * @tags magSusLog
   * @name MagSusLogControllerFindOne
   * @summary Get a magSusLog by id
   * @request GET:/api/v1/mag-sus-log/{id}
   * @secure
   */
  export namespace MagSusLogControllerFindOne {
    export type RequestParams = {
      /** MagSusLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MagSusLog;
  }

  /**
   * No description
   * @tags magSusLog
   * @name MagSusLogControllerUpdate
   * @summary Update a magSusLog
   * @request PUT:/api/v1/mag-sus-log/{id}
   * @secure
   */
  export namespace MagSusLogControllerUpdate {
    export type RequestParams = {
      /** MagSusLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateMagSusLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = MagSusLog;
  }

  /**
   * No description
   * @tags magSusLog
   * @name MagSusLogControllerRemove
   * @summary Delete a magSusLog
   * @request DELETE:/api/v1/mag-sus-log/{id}
   * @secure
   */
  export namespace MagSusLogControllerRemove {
    export type RequestParams = {
      /** MagSusLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags rockMechanicLog
   * @name RockMechanicLogControllerCreate
   * @summary Create a new rockMechanicLog
   * @request POST:/api/v1/rock-mechanic-log
   * @secure
   */
  export namespace RockMechanicLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateRockMechanicLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = RockMechanicLog;
  }

  /**
   * No description
   * @tags rockMechanicLog
   * @name RockMechanicLogControllerFindAll
   * @summary Get all rockMechanicLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/rock-mechanic-log
   * @secure
   */
  export namespace RockMechanicLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: RockMechanicLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: RockMechanicLog[];
    };
  }

  /**
   * No description
   * @tags rockMechanicLog
   * @name RockMechanicLogControllerFindOne
   * @summary Get a rockMechanicLog by id
   * @request GET:/api/v1/rock-mechanic-log/{id}
   * @secure
   */
  export namespace RockMechanicLogControllerFindOne {
    export type RequestParams = {
      /** RockMechanicLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RockMechanicLog;
  }

  /**
   * No description
   * @tags rockMechanicLog
   * @name RockMechanicLogControllerUpdate
   * @summary Update a rockMechanicLog
   * @request PUT:/api/v1/rock-mechanic-log/{id}
   * @secure
   */
  export namespace RockMechanicLogControllerUpdate {
    export type RequestParams = {
      /** RockMechanicLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateRockMechanicLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = RockMechanicLog;
  }

  /**
   * No description
   * @tags rockMechanicLog
   * @name RockMechanicLogControllerRemove
   * @summary Delete a rockMechanicLog
   * @request DELETE:/api/v1/rock-mechanic-log/{id}
   * @secure
   */
  export namespace RockMechanicLogControllerRemove {
    export type RequestParams = {
      /** RockMechanicLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags rockQualityDesignationLog
   * @name RockQualityDesignationLogControllerCreate
   * @summary Create a new rockQualityDesignationLog
   * @request POST:/api/v1/rock-quality-designation-log
   * @secure
   */
  export namespace RockQualityDesignationLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateRockQualityDesignationLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = RockQualityDesignationLog;
  }

  /**
   * No description
   * @tags rockQualityDesignationLog
   * @name RockQualityDesignationLogControllerFindAll
   * @summary Get all rockQualityDesignationLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/rock-quality-designation-log
   * @secure
   */
  export namespace RockQualityDesignationLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: RockQualityDesignationLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: RockQualityDesignationLog[];
    };
  }

  /**
   * No description
   * @tags rockQualityDesignationLog
   * @name RockQualityDesignationLogControllerFindOne
   * @summary Get a rockQualityDesignationLog by id
   * @request GET:/api/v1/rock-quality-designation-log/{id}
   * @secure
   */
  export namespace RockQualityDesignationLogControllerFindOne {
    export type RequestParams = {
      /** RockQualityDesignationLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RockQualityDesignationLog;
  }

  /**
   * No description
   * @tags rockQualityDesignationLog
   * @name RockQualityDesignationLogControllerUpdate
   * @summary Update a rockQualityDesignationLog
   * @request PUT:/api/v1/rock-quality-designation-log/{id}
   * @secure
   */
  export namespace RockQualityDesignationLogControllerUpdate {
    export type RequestParams = {
      /** RockQualityDesignationLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateRockQualityDesignationLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = RockQualityDesignationLog;
  }

  /**
   * No description
   * @tags rockQualityDesignationLog
   * @name RockQualityDesignationLogControllerRemove
   * @summary Delete a rockQualityDesignationLog
   * @request DELETE:/api/v1/rock-quality-designation-log/{id}
   * @secure
   */
  export namespace RockQualityDesignationLogControllerRemove {
    export type RequestParams = {
      /** RockQualityDesignationLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags specificGravityPtLog
   * @name SpecificGravityPtLogControllerCreate
   * @summary Create a new specificGravityPtLog
   * @request POST:/api/v1/specific-gravity-pt-log
   * @secure
   */
  export namespace SpecificGravityPtLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateSpecificGravityPtLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = SpecificGravityPtLog;
  }

  /**
   * No description
   * @tags specificGravityPtLog
   * @name SpecificGravityPtLogControllerFindAll
   * @summary Get all specificGravityPtLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/specific-gravity-pt-log
   * @secure
   */
  export namespace SpecificGravityPtLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SpecificGravityPtLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: SpecificGravityPtLog[];
    };
  }

  /**
   * No description
   * @tags specificGravityPtLog
   * @name SpecificGravityPtLogControllerFindOne
   * @summary Get a specificGravityPtLog by id
   * @request GET:/api/v1/specific-gravity-pt-log/{id}
   * @secure
   */
  export namespace SpecificGravityPtLogControllerFindOne {
    export type RequestParams = {
      /** SpecificGravityPtLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SpecificGravityPtLog;
  }

  /**
   * No description
   * @tags specificGravityPtLog
   * @name SpecificGravityPtLogControllerUpdate
   * @summary Update a specificGravityPtLog
   * @request PUT:/api/v1/specific-gravity-pt-log/{id}
   * @secure
   */
  export namespace SpecificGravityPtLogControllerUpdate {
    export type RequestParams = {
      /** SpecificGravityPtLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSpecificGravityPtLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = SpecificGravityPtLog;
  }

  /**
   * No description
   * @tags specificGravityPtLog
   * @name SpecificGravityPtLogControllerRemove
   * @summary Delete a specificGravityPtLog
   * @request DELETE:/api/v1/specific-gravity-pt-log/{id}
   * @secure
   */
  export namespace SpecificGravityPtLogControllerRemove {
    export type RequestParams = {
      /** SpecificGravityPtLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags labDispatch
   * @name LabDispatchControllerCreate
   * @summary Create a new labDispatch
   * @request POST:/api/v1/lab-dispatch
   * @secure
   */
  export namespace LabDispatchControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateLabDispatchDto;
    export type RequestHeaders = {};
    export type ResponseBody = LabDispatch;
  }

  /**
   * No description
   * @tags labDispatch
   * @name LabDispatchControllerFindAll
   * @summary Get all labDispatchs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/lab-dispatch
   * @secure
   */
  export namespace LabDispatchControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: LabDispatchControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: LabDispatch[];
    };
  }

  /**
   * No description
   * @tags labDispatch
   * @name LabDispatchControllerFindOne
   * @summary Get a labDispatch by id
   * @request GET:/api/v1/lab-dispatch/{id}
   * @secure
   */
  export namespace LabDispatchControllerFindOne {
    export type RequestParams = {
      /** LabDispatchId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = LabDispatch;
  }

  /**
   * No description
   * @tags labDispatch
   * @name LabDispatchControllerUpdate
   * @summary Update a labDispatch
   * @request PUT:/api/v1/lab-dispatch/{id}
   * @secure
   */
  export namespace LabDispatchControllerUpdate {
    export type RequestParams = {
      /** LabDispatchId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateLabDispatchDto;
    export type RequestHeaders = {};
    export type ResponseBody = LabDispatch;
  }

  /**
   * No description
   * @tags labDispatch
   * @name LabDispatchControllerRemove
   * @summary Delete a labDispatch
   * @request DELETE:/api/v1/lab-dispatch/{id}
   * @secure
   */
  export namespace LabDispatchControllerRemove {
    export type RequestParams = {
      /** LabDispatchId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags ptSample
   * @name PtSampleControllerCreate
   * @summary Create a new ptSample
   * @request POST:/api/v1/pt-sample
   * @secure
   */
  export namespace PtSampleControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreatePtSampleDto;
    export type RequestHeaders = {};
    export type ResponseBody = PtSample;
  }

  /**
   * No description
   * @tags ptSample
   * @name PtSampleControllerFindAll
   * @summary Get all ptSamples with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pt-sample
   * @secure
   */
  export namespace PtSampleControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: PtSampleControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: PtSample[];
    };
  }

  /**
   * No description
   * @tags ptSample
   * @name PtSampleControllerFindOne
   * @summary Get a ptSample by id
   * @request GET:/api/v1/pt-sample/{id}
   * @secure
   */
  export namespace PtSampleControllerFindOne {
    export type RequestParams = {
      /** PtSampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PtSample;
  }

  /**
   * No description
   * @tags ptSample
   * @name PtSampleControllerUpdate
   * @summary Update a ptSample
   * @request PUT:/api/v1/pt-sample/{id}
   * @secure
   */
  export namespace PtSampleControllerUpdate {
    export type RequestParams = {
      /** PtSampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePtSampleDto;
    export type RequestHeaders = {};
    export type ResponseBody = PtSample;
  }

  /**
   * No description
   * @tags ptSample
   * @name PtSampleControllerRemove
   * @summary Delete a ptSample
   * @request DELETE:/api/v1/pt-sample/{id}
   * @secure
   */
  export namespace PtSampleControllerRemove {
    export type RequestParams = {
      /** PtSampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags ptSampleQc
   * @name PtSampleQcControllerCreate
   * @summary Create a new ptSampleQc
   * @request POST:/api/v1/pt-sample-qc
   * @secure
   */
  export namespace PtSampleQcControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreatePtSampleQcDto;
    export type RequestHeaders = {};
    export type ResponseBody = PtSampleQc;
  }

  /**
   * No description
   * @tags ptSampleQc
   * @name PtSampleQcControllerFindAll
   * @summary Get all ptSampleQcs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pt-sample-qc
   * @secure
   */
  export namespace PtSampleQcControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: PtSampleQcControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: PtSampleQc[];
    };
  }

  /**
   * No description
   * @tags ptSampleQc
   * @name PtSampleQcControllerFindOne
   * @summary Get a ptSampleQc by id
   * @request GET:/api/v1/pt-sample-qc/{id}
   * @secure
   */
  export namespace PtSampleQcControllerFindOne {
    export type RequestParams = {
      /** PtSampleQcId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PtSampleQc;
  }

  /**
   * No description
   * @tags ptSampleQc
   * @name PtSampleQcControllerUpdate
   * @summary Update a ptSampleQc
   * @request PUT:/api/v1/pt-sample-qc/{id}
   * @secure
   */
  export namespace PtSampleQcControllerUpdate {
    export type RequestParams = {
      /** PtSampleQcId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePtSampleQcDto;
    export type RequestHeaders = {};
    export type ResponseBody = PtSampleQc;
  }

  /**
   * No description
   * @tags ptSampleQc
   * @name PtSampleQcControllerRemove
   * @summary Delete a ptSampleQc
   * @request DELETE:/api/v1/pt-sample-qc/{id}
   * @secure
   */
  export namespace PtSampleQcControllerRemove {
    export type RequestParams = {
      /** PtSampleQcId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags sample
   * @name SampleControllerCreate
   * @summary Create a new sample
   * @request POST:/api/v1/sample
   * @secure
   */
  export namespace SampleControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateSampleDto;
    export type RequestHeaders = {};
    export type ResponseBody = Sample;
  }

  /**
   * No description
   * @tags sample
   * @name SampleControllerFindAll
   * @summary Get all samples with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sample
   * @secure
   */
  export namespace SampleControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SampleControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Sample[];
    };
  }

  /**
   * No description
   * @tags sample
   * @name SampleControllerFindOne
   * @summary Get a sample by id
   * @request GET:/api/v1/sample/{id}
   * @secure
   */
  export namespace SampleControllerFindOne {
    export type RequestParams = {
      /** SampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Sample;
  }

  /**
   * No description
   * @tags sample
   * @name SampleControllerUpdate
   * @summary Update a sample
   * @request PUT:/api/v1/sample/{id}
   * @secure
   */
  export namespace SampleControllerUpdate {
    export type RequestParams = {
      /** SampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSampleDto;
    export type RequestHeaders = {};
    export type ResponseBody = Sample;
  }

  /**
   * No description
   * @tags sample
   * @name SampleControllerRemove
   * @summary Delete a sample
   * @request DELETE:/api/v1/sample/{id}
   * @secure
   */
  export namespace SampleControllerRemove {
    export type RequestParams = {
      /** SampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags sampleDispatch
   * @name SampleDispatchControllerCreate
   * @summary Create a new sampleDispatch
   * @request POST:/api/v1/sample-dispatch
   * @secure
   */
  export namespace SampleDispatchControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateSampleDispatchDto;
    export type RequestHeaders = {};
    export type ResponseBody = SampleDispatch;
  }

  /**
   * No description
   * @tags sampleDispatch
   * @name SampleDispatchControllerFindAll
   * @summary Get all sampleDispatchs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sample-dispatch
   * @secure
   */
  export namespace SampleDispatchControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SampleDispatchControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: SampleDispatch[];
    };
  }

  /**
   * No description
   * @tags sampleDispatch
   * @name SampleDispatchControllerFindOne
   * @summary Get a sampleDispatch by id
   * @request GET:/api/v1/sample-dispatch/{id}
   * @secure
   */
  export namespace SampleDispatchControllerFindOne {
    export type RequestParams = {
      /** SampleDispatchId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SampleDispatch;
  }

  /**
   * No description
   * @tags sampleDispatch
   * @name SampleDispatchControllerUpdate
   * @summary Update a sampleDispatch
   * @request PUT:/api/v1/sample-dispatch/{id}
   * @secure
   */
  export namespace SampleDispatchControllerUpdate {
    export type RequestParams = {
      /** SampleDispatchId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSampleDispatchDto;
    export type RequestHeaders = {};
    export type ResponseBody = SampleDispatch;
  }

  /**
   * No description
   * @tags sampleDispatch
   * @name SampleDispatchControllerRemove
   * @summary Delete a sampleDispatch
   * @request DELETE:/api/v1/sample-dispatch/{id}
   * @secure
   */
  export namespace SampleDispatchControllerRemove {
    export type RequestParams = {
      /** SampleDispatchId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags sampleIndex
   * @name SampleIndexControllerCreate
   * @summary Create a new sampleIndex
   * @request POST:/api/v1/sample-index
   * @secure
   */
  export namespace SampleIndexControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateSampleIndexDto;
    export type RequestHeaders = {};
    export type ResponseBody = SampleIndex;
  }

  /**
   * No description
   * @tags sampleIndex
   * @name SampleIndexControllerFindAll
   * @summary Get all sampleIndexs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sample-index
   * @secure
   */
  export namespace SampleIndexControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SampleIndexControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: SampleIndex[];
    };
  }

  /**
   * No description
   * @tags sampleIndex
   * @name SampleIndexControllerFindOne
   * @summary Get a sampleIndex by id
   * @request GET:/api/v1/sample-index/{id}
   * @secure
   */
  export namespace SampleIndexControllerFindOne {
    export type RequestParams = {
      /** SampleIndexId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SampleIndex;
  }

  /**
   * No description
   * @tags sampleIndex
   * @name SampleIndexControllerUpdate
   * @summary Update a sampleIndex
   * @request PUT:/api/v1/sample-index/{id}
   * @secure
   */
  export namespace SampleIndexControllerUpdate {
    export type RequestParams = {
      /** SampleIndexId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSampleIndexDto;
    export type RequestHeaders = {};
    export type ResponseBody = SampleIndex;
  }

  /**
   * No description
   * @tags sampleIndex
   * @name SampleIndexControllerRemove
   * @summary Delete a sampleIndex
   * @request DELETE:/api/v1/sample-index/{id}
   * @secure
   */
  export namespace SampleIndexControllerRemove {
    export type RequestParams = {
      /** SampleIndexId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags sampleQc
   * @name SampleQcControllerCreate
   * @summary Create a new sampleQc
   * @request POST:/api/v1/sample-qc
   * @secure
   */
  export namespace SampleQcControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateSampleQcDto;
    export type RequestHeaders = {};
    export type ResponseBody = SampleQc;
  }

  /**
   * No description
   * @tags sampleQc
   * @name SampleQcControllerFindAll
   * @summary Get all sampleQcs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sample-qc
   * @secure
   */
  export namespace SampleQcControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SampleQcControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: SampleQc[];
    };
  }

  /**
   * No description
   * @tags sampleQc
   * @name SampleQcControllerFindOne
   * @summary Get a sampleQc by id
   * @request GET:/api/v1/sample-qc/{id}
   * @secure
   */
  export namespace SampleQcControllerFindOne {
    export type RequestParams = {
      /** SampleQcId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SampleQc;
  }

  /**
   * No description
   * @tags sampleQc
   * @name SampleQcControllerUpdate
   * @summary Update a sampleQc
   * @request PUT:/api/v1/sample-qc/{id}
   * @secure
   */
  export namespace SampleQcControllerUpdate {
    export type RequestParams = {
      /** SampleQcId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSampleQcDto;
    export type RequestHeaders = {};
    export type ResponseBody = SampleQc;
  }

  /**
   * No description
   * @tags sampleQc
   * @name SampleQcControllerRemove
   * @summary Delete a sampleQc
   * @request DELETE:/api/v1/sample-qc/{id}
   * @secure
   */
  export namespace SampleQcControllerRemove {
    export type RequestParams = {
      /** SampleQcId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags sampleRegister
   * @name SampleRegisterControllerCreate
   * @summary Create a new sampleRegister
   * @request POST:/api/v1/sample-register
   * @secure
   */
  export namespace SampleRegisterControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateSampleRegisterDto;
    export type RequestHeaders = {};
    export type ResponseBody = SampleRegister;
  }

  /**
   * No description
   * @tags sampleRegister
   * @name SampleRegisterControllerFindAll
   * @summary Get all sampleRegisters with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sample-register
   * @secure
   */
  export namespace SampleRegisterControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SampleRegisterControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: SampleRegister[];
    };
  }

  /**
   * No description
   * @tags sampleRegister
   * @name SampleRegisterControllerFindOne
   * @summary Get a sampleRegister by id
   * @request GET:/api/v1/sample-register/{id}
   * @secure
   */
  export namespace SampleRegisterControllerFindOne {
    export type RequestParams = {
      /** SampleRegisterId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SampleRegister;
  }

  /**
   * No description
   * @tags sampleRegister
   * @name SampleRegisterControllerUpdate
   * @summary Update a sampleRegister
   * @request PUT:/api/v1/sample-register/{id}
   * @secure
   */
  export namespace SampleRegisterControllerUpdate {
    export type RequestParams = {
      /** SampleRegisterId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSampleRegisterDto;
    export type RequestHeaders = {};
    export type ResponseBody = SampleRegister;
  }

  /**
   * No description
   * @tags sampleRegister
   * @name SampleRegisterControllerRemove
   * @summary Delete a sampleRegister
   * @request DELETE:/api/v1/sample-register/{id}
   * @secure
   */
  export namespace SampleRegisterControllerRemove {
    export type RequestParams = {
      /** SampleRegisterId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags standardSample
   * @name StandardSampleControllerCreate
   * @summary Create a new standardSample
   * @request POST:/api/v1/standard-sample
   * @secure
   */
  export namespace StandardSampleControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateStandardSampleDto;
    export type RequestHeaders = {};
    export type ResponseBody = StandardSample;
  }

  /**
   * No description
   * @tags standardSample
   * @name StandardSampleControllerFindAll
   * @summary Get all standardSamples with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/standard-sample
   * @secure
   */
  export namespace StandardSampleControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: StandardSampleControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: StandardSample[];
    };
  }

  /**
   * No description
   * @tags standardSample
   * @name StandardSampleControllerFindOne
   * @summary Get a standardSample by id
   * @request GET:/api/v1/standard-sample/{id}
   * @secure
   */
  export namespace StandardSampleControllerFindOne {
    export type RequestParams = {
      /** StandardSampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = StandardSample;
  }

  /**
   * No description
   * @tags standardSample
   * @name StandardSampleControllerUpdate
   * @summary Update a standardSample
   * @request PUT:/api/v1/standard-sample/{id}
   * @secure
   */
  export namespace StandardSampleControllerUpdate {
    export type RequestParams = {
      /** StandardSampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateStandardSampleDto;
    export type RequestHeaders = {};
    export type ResponseBody = StandardSample;
  }

  /**
   * No description
   * @tags standardSample
   * @name StandardSampleControllerRemove
   * @summary Delete a standardSample
   * @request DELETE:/api/v1/standard-sample/{id}
   * @secure
   */
  export namespace StandardSampleControllerRemove {
    export type RequestParams = {
      /** StandardSampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags standardSampleQc
   * @name StandardSampleQcControllerCreate
   * @summary Create a new standardSampleQc
   * @request POST:/api/v1/standard-sample-qc
   * @secure
   */
  export namespace StandardSampleQcControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateStandardSampleQcDto;
    export type RequestHeaders = {};
    export type ResponseBody = StandardSampleQc;
  }

  /**
   * No description
   * @tags standardSampleQc
   * @name StandardSampleQcControllerFindAll
   * @summary Get all standardSampleQcs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/standard-sample-qc
   * @secure
   */
  export namespace StandardSampleQcControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: StandardSampleQcControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: StandardSampleQc[];
    };
  }

  /**
   * No description
   * @tags standardSampleQc
   * @name StandardSampleQcControllerFindOne
   * @summary Get a standardSampleQc by id
   * @request GET:/api/v1/standard-sample-qc/{id}
   * @secure
   */
  export namespace StandardSampleQcControllerFindOne {
    export type RequestParams = {
      /** StandardSampleQcId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = StandardSampleQc;
  }

  /**
   * No description
   * @tags standardSampleQc
   * @name StandardSampleQcControllerUpdate
   * @summary Update a standardSampleQc
   * @request PUT:/api/v1/standard-sample-qc/{id}
   * @secure
   */
  export namespace StandardSampleQcControllerUpdate {
    export type RequestParams = {
      /** StandardSampleQcId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateStandardSampleQcDto;
    export type RequestHeaders = {};
    export type ResponseBody = StandardSampleQc;
  }

  /**
   * No description
   * @tags standardSampleQc
   * @name StandardSampleQcControllerRemove
   * @summary Delete a standardSampleQc
   * @request DELETE:/api/v1/standard-sample-qc/{id}
   * @secure
   */
  export namespace StandardSampleQcControllerRemove {
    export type RequestParams = {
      /** StandardSampleQcId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags xrfSample
   * @name XrfSampleControllerCreate
   * @summary Create a new xrfSample
   * @request POST:/api/v1/xrf-sample
   * @secure
   */
  export namespace XrfSampleControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateXrfSampleDto;
    export type RequestHeaders = {};
    export type ResponseBody = XrfSample;
  }

  /**
   * No description
   * @tags xrfSample
   * @name XrfSampleControllerFindAll
   * @summary Get all xrfSamples with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/xrf-sample
   * @secure
   */
  export namespace XrfSampleControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: XrfSampleControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: XrfSample[];
    };
  }

  /**
   * No description
   * @tags xrfSample
   * @name XrfSampleControllerFindOne
   * @summary Get a xrfSample by id
   * @request GET:/api/v1/xrf-sample/{id}
   * @secure
   */
  export namespace XrfSampleControllerFindOne {
    export type RequestParams = {
      /** XrfSampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = XrfSample;
  }

  /**
   * No description
   * @tags xrfSample
   * @name XrfSampleControllerUpdate
   * @summary Update a xrfSample
   * @request PUT:/api/v1/xrf-sample/{id}
   * @secure
   */
  export namespace XrfSampleControllerUpdate {
    export type RequestParams = {
      /** XrfSampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateXrfSampleDto;
    export type RequestHeaders = {};
    export type ResponseBody = XrfSample;
  }

  /**
   * No description
   * @tags xrfSample
   * @name XrfSampleControllerRemove
   * @summary Delete a xrfSample
   * @request DELETE:/api/v1/xrf-sample/{id}
   * @secure
   */
  export namespace XrfSampleControllerRemove {
    export type RequestParams = {
      /** XrfSampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags xrfSampleQc
   * @name XrfSampleQcControllerCreate
   * @summary Create a new xrfSampleQc
   * @request POST:/api/v1/xrf-sample-qc
   * @secure
   */
  export namespace XrfSampleQcControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateXrfSampleQcDto;
    export type RequestHeaders = {};
    export type ResponseBody = XrfSampleQc;
  }

  /**
   * No description
   * @tags xrfSampleQc
   * @name XrfSampleQcControllerFindAll
   * @summary Get all xrfSampleQcs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/xrf-sample-qc
   * @secure
   */
  export namespace XrfSampleQcControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: XrfSampleQcControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: XrfSampleQc[];
    };
  }

  /**
   * No description
   * @tags xrfSampleQc
   * @name XrfSampleQcControllerFindOne
   * @summary Get a xrfSampleQc by id
   * @request GET:/api/v1/xrf-sample-qc/{id}
   * @secure
   */
  export namespace XrfSampleQcControllerFindOne {
    export type RequestParams = {
      /** XrfSampleQcId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = XrfSampleQc;
  }

  /**
   * No description
   * @tags xrfSampleQc
   * @name XrfSampleQcControllerUpdate
   * @summary Update a xrfSampleQc
   * @request PUT:/api/v1/xrf-sample-qc/{id}
   * @secure
   */
  export namespace XrfSampleQcControllerUpdate {
    export type RequestParams = {
      /** XrfSampleQcId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateXrfSampleQcDto;
    export type RequestHeaders = {};
    export type ResponseBody = XrfSampleQc;
  }

  /**
   * No description
   * @tags xrfSampleQc
   * @name XrfSampleQcControllerRemove
   * @summary Delete a xrfSampleQc
   * @request DELETE:/api/v1/xrf-sample-qc/{id}
   * @secure
   */
  export namespace XrfSampleQcControllerRemove {
    export type RequestParams = {
      /** XrfSampleQcId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags xrfStandardSample
   * @name XrfStandardSampleControllerCreate
   * @summary Create a new xrfStandardSample
   * @request POST:/api/v1/xrf-standard-sample
   * @secure
   */
  export namespace XrfStandardSampleControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateXrfStandardSampleDto;
    export type RequestHeaders = {};
    export type ResponseBody = XrfStandardSample;
  }

  /**
   * No description
   * @tags xrfStandardSample
   * @name XrfStandardSampleControllerFindAll
   * @summary Get all xrfStandardSamples with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/xrf-standard-sample
   * @secure
   */
  export namespace XrfStandardSampleControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: XrfStandardSampleControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: XrfStandardSample[];
    };
  }

  /**
   * No description
   * @tags xrfStandardSample
   * @name XrfStandardSampleControllerFindOne
   * @summary Get a xrfStandardSample by id
   * @request GET:/api/v1/xrf-standard-sample/{id}
   * @secure
   */
  export namespace XrfStandardSampleControllerFindOne {
    export type RequestParams = {
      /** XrfStandardSampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = XrfStandardSample;
  }

  /**
   * No description
   * @tags xrfStandardSample
   * @name XrfStandardSampleControllerUpdate
   * @summary Update a xrfStandardSample
   * @request PUT:/api/v1/xrf-standard-sample/{id}
   * @secure
   */
  export namespace XrfStandardSampleControllerUpdate {
    export type RequestParams = {
      /** XrfStandardSampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateXrfStandardSampleDto;
    export type RequestHeaders = {};
    export type ResponseBody = XrfStandardSample;
  }

  /**
   * No description
   * @tags xrfStandardSample
   * @name XrfStandardSampleControllerRemove
   * @summary Delete a xrfStandardSample
   * @request DELETE:/api/v1/xrf-standard-sample/{id}
   * @secure
   */
  export namespace XrfStandardSampleControllerRemove {
    export type RequestParams = {
      /** XrfStandardSampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags SamplesAll Upsert
   * @name SamplesAllControllerFindAll
   * @summary Get all samples with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/api/samples
   * @secure
   */
  export namespace SamplesAllControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SamplesAllControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: AllSamples[];
    };
  }

  /**
   * No description
   * @tags SamplesAll Upsert
   * @name SamplesAllControllerGetLatestSampleIdByPrefix
   * @summary Get the latest SampleID that starts with a given prefix
   * @request GET:/api/v1/api/samples/latest-sample-id
   * @secure
   */
  export namespace SamplesAllControllerGetLatestSampleIdByPrefix {
    export type RequestParams = {};
    export type RequestQuery = {
      /** The prefix to search for in SampleID */
      prefix: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * No description
   * @tags SamplesAll Upsert
   * @name SamplesAllControllerFindOne
   * @summary Get a sample by id
   * @request GET:/api/v1/api/samples/{id}
   * @secure
   */
  export namespace SamplesAllControllerFindOne {
    export type RequestParams = {
      /** SampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AllSamples;
  }

  /**
   * No description
   * @tags SamplesAll Upsert
   * @name SamplesAllControllerUpdate
   * @summary Update a sample
   * @request PUT:/api/v1/api/samples/{id}
   * @secure
   */
  export namespace SamplesAllControllerUpdate {
    export type RequestParams = {
      /** SampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAllSamplesDto;
    export type RequestHeaders = {};
    export type ResponseBody = AllSamples;
  }

  /**
   * No description
   * @tags SamplesAll Upsert
   * @name SamplesAllControllerRemove
   * @summary Delete a sample
   * @request DELETE:/api/v1/api/samples/{id}
   * @secure
   */
  export namespace SamplesAllControllerRemove {
    export type RequestParams = {
      /** SampleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags SamplesAll Upsert
   * @name SamplesAllControllerBulkUpsert
   * @summary Bulk create or update samples (upsert) - Routes to appropriate Sample.* tables
   * @request POST:/api/v1/api/samples/bulk-upsert
   * @secure
   */
  export namespace SamplesAllControllerBulkUpsert {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AllSamples[];
    export type RequestHeaders = {};
    export type ResponseBody = AllSamples[];
  }

  /**
   * @description Returns notifications formatted for frontend display with relative time strings
   * @tags notifications
   * @name NotificationControllerFindAllFormatted
   * @summary Get all notifications with formatted dates
   * @request GET:/api/v1/notifications
   */
  export namespace NotificationControllerFindAllFormatted {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Filter by user ID */
      userId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = NotificationResponseDto[];
  }

  /**
   * No description
   * @tags notifications
   * @name NotificationControllerCreate
   * @summary Create a new notification
   * @request POST:/api/v1/notifications
   * @secure
   */
  export namespace NotificationControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateNotificationDto;
    export type RequestHeaders = {};
    export type ResponseBody = Notification;
  }

  /**
   * @description Returns paginated notifications with full entity data
   * @tags notifications
   * @name NotificationControllerFindAll
   * @summary Get notifications with pagination, filtering, and sorting
   * @request GET:/api/v1/notifications/paginated
   * @secure
   */
  export namespace NotificationControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: NotificationControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Notification[];
    };
  }

  /**
   * No description
   * @tags notifications
   * @name NotificationControllerGetUnreadCount
   * @summary Get unread notification count for a user
   * @request GET:/api/v1/notifications/unread/count
   * @secure
   */
  export namespace NotificationControllerGetUnreadCount {
    export type RequestParams = {};
    export type RequestQuery = {
      /** User ID */
      userId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
      /** @example 5 */
      count?: number;
    };
  }

  /**
   * No description
   * @tags notifications
   * @name NotificationControllerMarkAllAsRead
   * @summary Mark all notifications as read for a user
   * @request PATCH:/api/v1/notifications/mark-all-read
   * @secure
   */
  export namespace NotificationControllerMarkAllAsRead {
    export type RequestParams = {};
    export type RequestQuery = {
      /** User ID */
      userId: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags notifications
   * @name NotificationControllerFindOne
   * @summary Get a notification by ID
   * @request GET:/api/v1/notifications/{id}
   * @secure
   */
  export namespace NotificationControllerFindOne {
    export type RequestParams = {
      /** Notification ID (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Notification;
  }

  /**
   * No description
   * @tags notifications
   * @name NotificationControllerUpdate
   * @summary Update a notification
   * @request PUT:/api/v1/notifications/{id}
   * @secure
   */
  export namespace NotificationControllerUpdate {
    export type RequestParams = {
      /** Notification ID (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateNotificationDto;
    export type RequestHeaders = {};
    export type ResponseBody = Notification;
  }

  /**
   * No description
   * @tags notifications
   * @name NotificationControllerRemove
   * @summary Delete a notification
   * @request DELETE:/api/v1/notifications/{id}
   * @secure
   */
  export namespace NotificationControllerRemove {
    export type RequestParams = {
      /** Notification ID (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags notifications
   * @name NotificationControllerMarkAsRead
   * @summary Mark a notification as read
   * @request PATCH:/api/v1/notifications/{id}/read
   * @secure
   */
  export namespace NotificationControllerMarkAsRead {
    export type RequestParams = {
      /** Notification ID (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Notification;
  }

  /**
   * @description Two-way sync between client IndexedDB and server database. Supports all entities dynamically with chunking for large change sets.
   * @tags sync
   * @name SyncControllerSync
   * @summary Dexie-Syncable Protocol Endpoint
   * @request POST:/api/v1/sync
   * @secure
   */
  export namespace SyncControllerSync {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SyncRequestDto;
    export type RequestHeaders = {
      "x-client-id": string;
      /** Optional client identifier for tracking sync state */
      "X-Client-Id"?: string;
    };
    export type ResponseBody = SyncResponseDto;
  }

  /**
   * @description Fetch updated records for multiple tables based on rowversion. Returns all records where ActiveInd = 1 and rv > provided rv for each table.
   * @tags sync
   * @name SyncControllerSyncRv
   * @summary Rowversion-based sync for multiple tables
   * @request POST:/api/v1/sync/rv
   * @secure
   */
  export namespace SyncControllerSyncRv {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SyncRvRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = SyncRvResponseDto;
  }

  /**
   * @description Remove sync change log entries older than specified days (default: 90 days). This helps maintain database performance.
   * @tags sync
   * @name SyncControllerCleanup
   * @summary Cleanup old sync change logs
   * @request POST:/api/v1/sync/cleanup
   * @secure
   */
  export namespace SyncControllerCleanup {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Number of days of change history to retain
       * @example 90
       */
      daysToKeep?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
      /** @example 15000 */
      deletedRows?: number;
      /** @example 90 */
      daysKept?: number;
      /** @example "Cleaned up 15000 old change log entries" */
      message?: string;
    };
  }

  /**
   * @description Check sync table sizes, retention, and system status. Use for monitoring and alerts.
   * @tags sync
   * @name SyncControllerHealth
   * @summary Sync system health check
   * @request GET:/api/v1/sync/health
   * @secure
   */
  export namespace SyncControllerHealth {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
      /** @example "healthy" */
      status?: SyncControllerHealthStatusEnum;
      /** @example 1500000 */
      changeLogRows?: number;
      /** @example "2026-01-05T00:00:00Z" */
      oldestChange?: string;
      /** @example "2026-02-04T08:00:00Z" */
      newestChange?: string;
      /** @example 30 */
      retentionDays?: number;
      /** @example 25 */
      clientStates?: number;
      /** @example 156 */
      registeredEntities?: number;
      warnings?: string[];
      /** @example "2026-02-04T08:55:00Z" */
      timestamp?: string;
    };
  }

  /**
   * @description Retrieve sync state for a specific client including last sync revision and pending changes.
   * @tags sync
   * @name SyncControllerGetStatus
   * @summary Get client sync status
   * @request GET:/api/v1/sync/status
   * @secure
   */
  export namespace SyncControllerGetStatus {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Client identifier (defaults to current user) */
      clientId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = {
      /** @example "client-123" */
      clientId?: string;
      tables?: {
        /** @example "Collar" */
        tableName?: string;
        /** @example "12345" */
        lastSyncRevision?: string;
        /** @example "2026-02-04T08:00:00Z" */
        lastSyncTimestamp?: string;
        /** @example 5 */
        pendingChanges?: number;
      }[];
      /** @example "2026-02-04T09:00:00Z" */
      timestamp?: string;
    };
  }

  /**
   * No description
   * @tags assayBatch
   * @name AssayBatchControllerCreate
   * @summary Create a new assayBatch
   * @request POST:/api/v1/assay-batch
   * @secure
   */
  export namespace AssayBatchControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAssayBatchDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayBatch;
  }

  /**
   * No description
   * @tags assayBatch
   * @name AssayBatchControllerFindAll
   * @summary Get all assayBatchs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-batch
   * @secure
   */
  export namespace AssayBatchControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: AssayBatchControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: AssayBatch[];
    };
  }

  /**
   * No description
   * @tags assayBatch
   * @name AssayBatchControllerFindOne
   * @summary Get a assayBatch by id
   * @request GET:/api/v1/assay-batch/{id}
   * @secure
   */
  export namespace AssayBatchControllerFindOne {
    export type RequestParams = {
      /** AssayBatchId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AssayBatch;
  }

  /**
   * No description
   * @tags assayBatch
   * @name AssayBatchControllerUpdate
   * @summary Update a assayBatch
   * @request PUT:/api/v1/assay-batch/{id}
   * @secure
   */
  export namespace AssayBatchControllerUpdate {
    export type RequestParams = {
      /** AssayBatchId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAssayBatchDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayBatch;
  }

  /**
   * No description
   * @tags assayBatch
   * @name AssayBatchControllerRemove
   * @summary Delete a assayBatch
   * @request DELETE:/api/v1/assay-batch/{id}
   * @secure
   */
  export namespace AssayBatchControllerRemove {
    export type RequestParams = {
      /** AssayBatchId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags assayBatchDetail
   * @name AssayBatchDetailControllerCreate
   * @summary Create a new assayBatchDetail
   * @request POST:/api/v1/assay-batch-detail
   * @secure
   */
  export namespace AssayBatchDetailControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAssayBatchDetailDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayBatchDetail;
  }

  /**
   * No description
   * @tags assayBatchDetail
   * @name AssayBatchDetailControllerFindAll
   * @summary Get all assayBatchDetails with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-batch-detail
   * @secure
   */
  export namespace AssayBatchDetailControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: AssayBatchDetailControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: AssayBatchDetail[];
    };
  }

  /**
   * No description
   * @tags assayBatchDetail
   * @name AssayBatchDetailControllerFindOne
   * @summary Get a assayBatchDetail by id
   * @request GET:/api/v1/assay-batch-detail/{id}
   * @secure
   */
  export namespace AssayBatchDetailControllerFindOne {
    export type RequestParams = {
      /** AssayBatchDetailId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AssayBatchDetail;
  }

  /**
   * No description
   * @tags assayBatchDetail
   * @name AssayBatchDetailControllerUpdate
   * @summary Update a assayBatchDetail
   * @request PUT:/api/v1/assay-batch-detail/{id}
   * @secure
   */
  export namespace AssayBatchDetailControllerUpdate {
    export type RequestParams = {
      /** AssayBatchDetailId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAssayBatchDetailDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayBatchDetail;
  }

  /**
   * No description
   * @tags assayBatchDetail
   * @name AssayBatchDetailControllerRemove
   * @summary Delete a assayBatchDetail
   * @request DELETE:/api/v1/assay-batch-detail/{id}
   * @secure
   */
  export namespace AssayBatchDetailControllerRemove {
    export type RequestParams = {
      /** AssayBatchDetailId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags assayBatchStatus
   * @name AssayBatchStatusControllerCreate
   * @summary Create a new assayBatchStatus
   * @request POST:/api/v1/assay-batch-status
   * @secure
   */
  export namespace AssayBatchStatusControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAssayBatchStatusDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayBatchStatus;
  }

  /**
   * No description
   * @tags assayBatchStatus
   * @name AssayBatchStatusControllerFindAll
   * @summary Get all assayBatchStatuss with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-batch-status
   * @secure
   */
  export namespace AssayBatchStatusControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: AssayBatchStatusControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: AssayBatchStatus[];
    };
  }

  /**
   * No description
   * @tags assayBatchStatus
   * @name AssayBatchStatusControllerFindOne
   * @summary Get a assayBatchStatus by id
   * @request GET:/api/v1/assay-batch-status/{id}
   * @secure
   */
  export namespace AssayBatchStatusControllerFindOne {
    export type RequestParams = {
      /** AssayBatchStatusId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AssayBatchStatus;
  }

  /**
   * No description
   * @tags assayBatchStatus
   * @name AssayBatchStatusControllerUpdate
   * @summary Update a assayBatchStatus
   * @request PUT:/api/v1/assay-batch-status/{id}
   * @secure
   */
  export namespace AssayBatchStatusControllerUpdate {
    export type RequestParams = {
      /** AssayBatchStatusId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAssayBatchStatusDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayBatchStatus;
  }

  /**
   * No description
   * @tags assayBatchStatus
   * @name AssayBatchStatusControllerRemove
   * @summary Delete a assayBatchStatus
   * @request DELETE:/api/v1/assay-batch-status/{id}
   * @secure
   */
  export namespace AssayBatchStatusControllerRemove {
    export type RequestParams = {
      /** AssayBatchStatusId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags assayBatchStatusLog
   * @name AssayBatchStatusLogControllerCreate
   * @summary Create a new assayBatchStatusLog
   * @request POST:/api/v1/assay-batch-status-log
   * @secure
   */
  export namespace AssayBatchStatusLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAssayBatchStatusLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayBatchStatusLog;
  }

  /**
   * No description
   * @tags assayBatchStatusLog
   * @name AssayBatchStatusLogControllerFindAll
   * @summary Get all assayBatchStatusLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-batch-status-log
   * @secure
   */
  export namespace AssayBatchStatusLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: AssayBatchStatusLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: AssayBatchStatusLog[];
    };
  }

  /**
   * No description
   * @tags assayBatchStatusLog
   * @name AssayBatchStatusLogControllerFindOne
   * @summary Get a assayBatchStatusLog by id
   * @request GET:/api/v1/assay-batch-status-log/{id}
   * @secure
   */
  export namespace AssayBatchStatusLogControllerFindOne {
    export type RequestParams = {
      /** AssayBatchStatusLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AssayBatchStatusLog;
  }

  /**
   * No description
   * @tags assayBatchStatusLog
   * @name AssayBatchStatusLogControllerUpdate
   * @summary Update a assayBatchStatusLog
   * @request PUT:/api/v1/assay-batch-status-log/{id}
   * @secure
   */
  export namespace AssayBatchStatusLogControllerUpdate {
    export type RequestParams = {
      /** AssayBatchStatusLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAssayBatchStatusLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayBatchStatusLog;
  }

  /**
   * No description
   * @tags assayBatchStatusLog
   * @name AssayBatchStatusLogControllerRemove
   * @summary Delete a assayBatchStatusLog
   * @request DELETE:/api/v1/assay-batch-status-log/{id}
   * @secure
   */
  export namespace AssayBatchStatusLogControllerRemove {
    export type RequestParams = {
      /** AssayBatchStatusLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags assayElement
   * @name AssayElementControllerCreate
   * @summary Create a new assayElement
   * @request POST:/api/v1/assay-element
   * @secure
   */
  export namespace AssayElementControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAssayElementDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayElement;
  }

  /**
   * No description
   * @tags assayElement
   * @name AssayElementControllerFindAll
   * @summary Get all assayElements with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-element
   * @secure
   */
  export namespace AssayElementControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: AssayElementControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: AssayElement[];
    };
  }

  /**
   * No description
   * @tags assayElement
   * @name AssayElementControllerFindOne
   * @summary Get a assayElement by id
   * @request GET:/api/v1/assay-element/{id}
   * @secure
   */
  export namespace AssayElementControllerFindOne {
    export type RequestParams = {
      /** AssayElementId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AssayElement;
  }

  /**
   * No description
   * @tags assayElement
   * @name AssayElementControllerUpdate
   * @summary Update a assayElement
   * @request PUT:/api/v1/assay-element/{id}
   * @secure
   */
  export namespace AssayElementControllerUpdate {
    export type RequestParams = {
      /** AssayElementId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAssayElementDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayElement;
  }

  /**
   * No description
   * @tags assayElement
   * @name AssayElementControllerRemove
   * @summary Delete a assayElement
   * @request DELETE:/api/v1/assay-element/{id}
   * @secure
   */
  export namespace AssayElementControllerRemove {
    export type RequestParams = {
      /** AssayElementId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags assayElementGroup
   * @name AssayElementGroupControllerCreate
   * @summary Create a new assayElementGroup
   * @request POST:/api/v1/assay-element-group
   * @secure
   */
  export namespace AssayElementGroupControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAssayElementGroupDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayElementGroup;
  }

  /**
   * No description
   * @tags assayElementGroup
   * @name AssayElementGroupControllerFindAll
   * @summary Get all assayElementGroups with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-element-group
   * @secure
   */
  export namespace AssayElementGroupControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: AssayElementGroupControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: AssayElementGroup[];
    };
  }

  /**
   * No description
   * @tags assayElementGroup
   * @name AssayElementGroupControllerFindOne
   * @summary Get a assayElementGroup by id
   * @request GET:/api/v1/assay-element-group/{id}
   * @secure
   */
  export namespace AssayElementGroupControllerFindOne {
    export type RequestParams = {
      /** AssayElementGroupId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AssayElementGroup;
  }

  /**
   * No description
   * @tags assayElementGroup
   * @name AssayElementGroupControllerUpdate
   * @summary Update a assayElementGroup
   * @request PUT:/api/v1/assay-element-group/{id}
   * @secure
   */
  export namespace AssayElementGroupControllerUpdate {
    export type RequestParams = {
      /** AssayElementGroupId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAssayElementGroupDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayElementGroup;
  }

  /**
   * No description
   * @tags assayElementGroup
   * @name AssayElementGroupControllerRemove
   * @summary Delete a assayElementGroup
   * @request DELETE:/api/v1/assay-element-group/{id}
   * @secure
   */
  export namespace AssayElementGroupControllerRemove {
    export type RequestParams = {
      /** AssayElementGroupId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags assayLab
   * @name AssayLabControllerCreate
   * @summary Create a new assayLab
   * @request POST:/api/v1/assay-lab
   * @secure
   */
  export namespace AssayLabControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAssayLabDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayLab;
  }

  /**
   * No description
   * @tags assayLab
   * @name AssayLabControllerFindAll
   * @summary Get all assayLabs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-lab
   * @secure
   */
  export namespace AssayLabControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: AssayLabControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: AssayLab[];
    };
  }

  /**
   * No description
   * @tags assayLab
   * @name AssayLabControllerFindOne
   * @summary Get a assayLab by id
   * @request GET:/api/v1/assay-lab/{id}
   * @secure
   */
  export namespace AssayLabControllerFindOne {
    export type RequestParams = {
      /** AssayLabId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AssayLab;
  }

  /**
   * No description
   * @tags assayLab
   * @name AssayLabControllerUpdate
   * @summary Update a assayLab
   * @request PUT:/api/v1/assay-lab/{id}
   * @secure
   */
  export namespace AssayLabControllerUpdate {
    export type RequestParams = {
      /** AssayLabId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAssayLabDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayLab;
  }

  /**
   * No description
   * @tags assayLab
   * @name AssayLabControllerRemove
   * @summary Delete a assayLab
   * @request DELETE:/api/v1/assay-lab/{id}
   * @secure
   */
  export namespace AssayLabControllerRemove {
    export type RequestParams = {
      /** AssayLabId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags assayLabElementAlias
   * @name AssayLabElementAliasControllerCreate
   * @summary Create a new assayLabElementAlias
   * @request POST:/api/v1/assay-lab-element-alias
   * @secure
   */
  export namespace AssayLabElementAliasControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAssayLabElementAliasDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayLabElementAlias;
  }

  /**
   * No description
   * @tags assayLabElementAlias
   * @name AssayLabElementAliasControllerFindAll
   * @summary Get all assayLabElementAliass with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-lab-element-alias
   * @secure
   */
  export namespace AssayLabElementAliasControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: AssayLabElementAliasControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: AssayLabElementAlias[];
    };
  }

  /**
   * No description
   * @tags assayLabElementAlias
   * @name AssayLabElementAliasControllerFindOne
   * @summary Get a assayLabElementAlias by id
   * @request GET:/api/v1/assay-lab-element-alias/{id}
   * @secure
   */
  export namespace AssayLabElementAliasControllerFindOne {
    export type RequestParams = {
      /** AssayLabElementAliasId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AssayLabElementAlias;
  }

  /**
   * No description
   * @tags assayLabElementAlias
   * @name AssayLabElementAliasControllerUpdate
   * @summary Update a assayLabElementAlias
   * @request PUT:/api/v1/assay-lab-element-alias/{id}
   * @secure
   */
  export namespace AssayLabElementAliasControllerUpdate {
    export type RequestParams = {
      /** AssayLabElementAliasId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAssayLabElementAliasDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayLabElementAlias;
  }

  /**
   * No description
   * @tags assayLabElementAlias
   * @name AssayLabElementAliasControllerRemove
   * @summary Delete a assayLabElementAlias
   * @request DELETE:/api/v1/assay-lab-element-alias/{id}
   * @secure
   */
  export namespace AssayLabElementAliasControllerRemove {
    export type RequestParams = {
      /** AssayLabElementAliasId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags assayLabMethod
   * @name AssayLabMethodControllerCreate
   * @summary Create a new assayLabMethod
   * @request POST:/api/v1/assay-lab-method
   * @secure
   */
  export namespace AssayLabMethodControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAssayLabMethodDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayLabMethod;
  }

  /**
   * No description
   * @tags assayLabMethod
   * @name AssayLabMethodControllerFindAll
   * @summary Get all assayLabMethods with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-lab-method
   * @secure
   */
  export namespace AssayLabMethodControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: AssayLabMethodControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: AssayLabMethod[];
    };
  }

  /**
   * No description
   * @tags assayLabMethod
   * @name AssayLabMethodControllerFindOne
   * @summary Get a assayLabMethod by id
   * @request GET:/api/v1/assay-lab-method/{id}
   * @secure
   */
  export namespace AssayLabMethodControllerFindOne {
    export type RequestParams = {
      /** AssayLabMethodId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AssayLabMethod;
  }

  /**
   * No description
   * @tags assayLabMethod
   * @name AssayLabMethodControllerUpdate
   * @summary Update a assayLabMethod
   * @request PUT:/api/v1/assay-lab-method/{id}
   * @secure
   */
  export namespace AssayLabMethodControllerUpdate {
    export type RequestParams = {
      /** AssayLabMethodId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAssayLabMethodDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayLabMethod;
  }

  /**
   * No description
   * @tags assayLabMethod
   * @name AssayLabMethodControllerRemove
   * @summary Delete a assayLabMethod
   * @request DELETE:/api/v1/assay-lab-method/{id}
   * @secure
   */
  export namespace AssayLabMethodControllerRemove {
    export type RequestParams = {
      /** AssayLabMethodId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags assayMethodGeneric
   * @name AssayMethodGenericControllerCreate
   * @summary Create a new assayMethodGeneric
   * @request POST:/api/v1/assay-method-generic
   * @secure
   */
  export namespace AssayMethodGenericControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAssayMethodGenericDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayMethodGeneric;
  }

  /**
   * No description
   * @tags assayMethodGeneric
   * @name AssayMethodGenericControllerFindAll
   * @summary Get all assayMethodGenerics with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-method-generic
   * @secure
   */
  export namespace AssayMethodGenericControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: AssayMethodGenericControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: AssayMethodGeneric[];
    };
  }

  /**
   * No description
   * @tags assayMethodGeneric
   * @name AssayMethodGenericControllerFindOne
   * @summary Get a assayMethodGeneric by id
   * @request GET:/api/v1/assay-method-generic/{id}
   * @secure
   */
  export namespace AssayMethodGenericControllerFindOne {
    export type RequestParams = {
      /** AssayMethodGenericId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AssayMethodGeneric;
  }

  /**
   * No description
   * @tags assayMethodGeneric
   * @name AssayMethodGenericControllerUpdate
   * @summary Update a assayMethodGeneric
   * @request PUT:/api/v1/assay-method-generic/{id}
   * @secure
   */
  export namespace AssayMethodGenericControllerUpdate {
    export type RequestParams = {
      /** AssayMethodGenericId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAssayMethodGenericDto;
    export type RequestHeaders = {};
    export type ResponseBody = AssayMethodGeneric;
  }

  /**
   * No description
   * @tags assayMethodGeneric
   * @name AssayMethodGenericControllerRemove
   * @summary Delete a assayMethodGeneric
   * @request DELETE:/api/v1/assay-method-generic/{id}
   * @secure
   */
  export namespace AssayMethodGenericControllerRemove {
    export type RequestParams = {
      /** AssayMethodGenericId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcAnalysisType
   * @name QcAnalysisTypeControllerCreate
   * @summary Create a new qcAnalysisType
   * @request POST:/api/v1/qc-analysis-type
   * @secure
   */
  export namespace QcAnalysisTypeControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcAnalysisTypeDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcAnalysisType;
  }

  /**
   * No description
   * @tags qcAnalysisType
   * @name QcAnalysisTypeControllerFindAll
   * @summary Get all qcAnalysisTypes with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-analysis-type
   * @secure
   */
  export namespace QcAnalysisTypeControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcAnalysisTypeControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcAnalysisType[];
    };
  }

  /**
   * No description
   * @tags qcAnalysisType
   * @name QcAnalysisTypeControllerFindOne
   * @summary Get a qcAnalysisType by id
   * @request GET:/api/v1/qc-analysis-type/{id}
   * @secure
   */
  export namespace QcAnalysisTypeControllerFindOne {
    export type RequestParams = {
      /** QcAnalysisTypeId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcAnalysisType;
  }

  /**
   * No description
   * @tags qcAnalysisType
   * @name QcAnalysisTypeControllerUpdate
   * @summary Update a qcAnalysisType
   * @request PUT:/api/v1/qc-analysis-type/{id}
   * @secure
   */
  export namespace QcAnalysisTypeControllerUpdate {
    export type RequestParams = {
      /** QcAnalysisTypeId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcAnalysisTypeDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcAnalysisType;
  }

  /**
   * No description
   * @tags qcAnalysisType
   * @name QcAnalysisTypeControllerRemove
   * @summary Delete a qcAnalysisType
   * @request DELETE:/api/v1/qc-analysis-type/{id}
   * @secure
   */
  export namespace QcAnalysisTypeControllerRemove {
    export type RequestParams = {
      /** QcAnalysisTypeId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcClassification
   * @name QcClassificationControllerCreate
   * @summary Create a new qcClassification
   * @request POST:/api/v1/qc-classification
   * @secure
   */
  export namespace QcClassificationControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcClassificationDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcClassification;
  }

  /**
   * No description
   * @tags qcClassification
   * @name QcClassificationControllerFindAll
   * @summary Get all qcClassifications with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-classification
   * @secure
   */
  export namespace QcClassificationControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcClassificationControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcClassification[];
    };
  }

  /**
   * No description
   * @tags qcClassification
   * @name QcClassificationControllerFindOne
   * @summary Get a qcClassification by id
   * @request GET:/api/v1/qc-classification/{id}
   * @secure
   */
  export namespace QcClassificationControllerFindOne {
    export type RequestParams = {
      /** QcClassificationId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcClassification;
  }

  /**
   * No description
   * @tags qcClassification
   * @name QcClassificationControllerUpdate
   * @summary Update a qcClassification
   * @request PUT:/api/v1/qc-classification/{id}
   * @secure
   */
  export namespace QcClassificationControllerUpdate {
    export type RequestParams = {
      /** QcClassificationId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcClassificationDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcClassification;
  }

  /**
   * No description
   * @tags qcClassification
   * @name QcClassificationControllerRemove
   * @summary Delete a qcClassification
   * @request DELETE:/api/v1/qc-classification/{id}
   * @secure
   */
  export namespace QcClassificationControllerRemove {
    export type RequestParams = {
      /** QcClassificationId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcFilteredset
   * @name QcFilteredsetControllerCreate
   * @summary Create a new qcFilteredset
   * @request POST:/api/v1/qc-filteredset
   * @secure
   */
  export namespace QcFilteredsetControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcFilteredsetDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcFilteredset;
  }

  /**
   * No description
   * @tags qcFilteredset
   * @name QcFilteredsetControllerFindAll
   * @summary Get all qcFilteredsets with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-filteredset
   * @secure
   */
  export namespace QcFilteredsetControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcFilteredsetControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcFilteredset[];
    };
  }

  /**
   * No description
   * @tags qcFilteredset
   * @name QcFilteredsetControllerFindOne
   * @summary Get a qcFilteredset by id
   * @request GET:/api/v1/qc-filteredset/{id}
   * @secure
   */
  export namespace QcFilteredsetControllerFindOne {
    export type RequestParams = {
      /** QcFilteredsetId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcFilteredset;
  }

  /**
   * No description
   * @tags qcFilteredset
   * @name QcFilteredsetControllerUpdate
   * @summary Update a qcFilteredset
   * @request PUT:/api/v1/qc-filteredset/{id}
   * @secure
   */
  export namespace QcFilteredsetControllerUpdate {
    export type RequestParams = {
      /** QcFilteredsetId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcFilteredsetDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcFilteredset;
  }

  /**
   * No description
   * @tags qcFilteredset
   * @name QcFilteredsetControllerRemove
   * @summary Delete a qcFilteredset
   * @request DELETE:/api/v1/qc-filteredset/{id}
   * @secure
   */
  export namespace QcFilteredsetControllerRemove {
    export type RequestParams = {
      /** QcFilteredsetId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcGroup
   * @name QcGroupControllerCreate
   * @summary Create a new qcGroup
   * @request POST:/api/v1/qc-group
   * @secure
   */
  export namespace QcGroupControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcGroupDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcGroup;
  }

  /**
   * No description
   * @tags qcGroup
   * @name QcGroupControllerFindAll
   * @summary Get all qcGroups with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-group
   * @secure
   */
  export namespace QcGroupControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcGroupControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcGroup[];
    };
  }

  /**
   * No description
   * @tags qcGroup
   * @name QcGroupControllerFindOne
   * @summary Get a qcGroup by id
   * @request GET:/api/v1/qc-group/{id}
   * @secure
   */
  export namespace QcGroupControllerFindOne {
    export type RequestParams = {
      /** QcGroupId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcGroup;
  }

  /**
   * No description
   * @tags qcGroup
   * @name QcGroupControllerUpdate
   * @summary Update a qcGroup
   * @request PUT:/api/v1/qc-group/{id}
   * @secure
   */
  export namespace QcGroupControllerUpdate {
    export type RequestParams = {
      /** QcGroupId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcGroupDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcGroup;
  }

  /**
   * No description
   * @tags qcGroup
   * @name QcGroupControllerRemove
   * @summary Delete a qcGroup
   * @request DELETE:/api/v1/qc-group/{id}
   * @secure
   */
  export namespace QcGroupControllerRemove {
    export type RequestParams = {
      /** QcGroupId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcInsertionRule
   * @name QcInsertionRuleControllerCreate
   * @summary Create a new qcInsertionRule
   * @request POST:/api/v1/qc-insertion-rule
   * @secure
   */
  export namespace QcInsertionRuleControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcInsertionRuleDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcInsertionRule;
  }

  /**
   * No description
   * @tags qcInsertionRule
   * @name QcInsertionRuleControllerFindAll
   * @summary Get all qcInsertionRules with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-insertion-rule
   * @secure
   */
  export namespace QcInsertionRuleControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcInsertionRuleControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcInsertionRule[];
    };
  }

  /**
   * No description
   * @tags qcInsertionRule
   * @name QcInsertionRuleControllerFindOne
   * @summary Get a qcInsertionRule by id
   * @request GET:/api/v1/qc-insertion-rule/{id}
   * @secure
   */
  export namespace QcInsertionRuleControllerFindOne {
    export type RequestParams = {
      /** QcInsertionRuleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcInsertionRule;
  }

  /**
   * No description
   * @tags qcInsertionRule
   * @name QcInsertionRuleControllerUpdate
   * @summary Update a qcInsertionRule
   * @request PUT:/api/v1/qc-insertion-rule/{id}
   * @secure
   */
  export namespace QcInsertionRuleControllerUpdate {
    export type RequestParams = {
      /** QcInsertionRuleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcInsertionRuleDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcInsertionRule;
  }

  /**
   * No description
   * @tags qcInsertionRule
   * @name QcInsertionRuleControllerRemove
   * @summary Delete a qcInsertionRule
   * @request DELETE:/api/v1/qc-insertion-rule/{id}
   * @secure
   */
  export namespace QcInsertionRuleControllerRemove {
    export type RequestParams = {
      /** QcInsertionRuleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcInsertionRuleStandardSequence
   * @name QcInsertionRuleStandardSequenceControllerCreate
   * @summary Create a new qcInsertionRuleStandardSequence
   * @request POST:/api/v1/qc-insertion-rule-standard-sequence
   * @secure
   */
  export namespace QcInsertionRuleStandardSequenceControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcInsertionRuleStandardSequenceDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcInsertionRuleStandardSequence;
  }

  /**
   * No description
   * @tags qcInsertionRuleStandardSequence
   * @name QcInsertionRuleStandardSequenceControllerFindAll
   * @summary Get all qcInsertionRuleStandardSequences with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-insertion-rule-standard-sequence
   * @secure
   */
  export namespace QcInsertionRuleStandardSequenceControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcInsertionRuleStandardSequenceControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcInsertionRuleStandardSequence[];
    };
  }

  /**
   * No description
   * @tags qcInsertionRuleStandardSequence
   * @name QcInsertionRuleStandardSequenceControllerFindOne
   * @summary Get a qcInsertionRuleStandardSequence by id
   * @request GET:/api/v1/qc-insertion-rule-standard-sequence/{id}
   * @secure
   */
  export namespace QcInsertionRuleStandardSequenceControllerFindOne {
    export type RequestParams = {
      /** QcInsertionRuleStandardSequenceId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcInsertionRuleStandardSequence;
  }

  /**
   * No description
   * @tags qcInsertionRuleStandardSequence
   * @name QcInsertionRuleStandardSequenceControllerUpdate
   * @summary Update a qcInsertionRuleStandardSequence
   * @request PUT:/api/v1/qc-insertion-rule-standard-sequence/{id}
   * @secure
   */
  export namespace QcInsertionRuleStandardSequenceControllerUpdate {
    export type RequestParams = {
      /** QcInsertionRuleStandardSequenceId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcInsertionRuleStandardSequenceDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcInsertionRuleStandardSequence;
  }

  /**
   * No description
   * @tags qcInsertionRuleStandardSequence
   * @name QcInsertionRuleStandardSequenceControllerRemove
   * @summary Delete a qcInsertionRuleStandardSequence
   * @request DELETE:/api/v1/qc-insertion-rule-standard-sequence/{id}
   * @secure
   */
  export namespace QcInsertionRuleStandardSequenceControllerRemove {
    export type RequestParams = {
      /** QcInsertionRuleStandardSequenceId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcReference
   * @name QcReferenceControllerCreate
   * @summary Create a new qcReference
   * @request POST:/api/v1/qc-reference
   * @secure
   */
  export namespace QcReferenceControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcReferenceDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcReference;
  }

  /**
   * No description
   * @tags qcReference
   * @name QcReferenceControllerFindAll
   * @summary Get all qcReferences with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-reference
   * @secure
   */
  export namespace QcReferenceControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcReferenceControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcReference[];
    };
  }

  /**
   * No description
   * @tags qcReference
   * @name QcReferenceControllerFindOne
   * @summary Get a qcReference by id
   * @request GET:/api/v1/qc-reference/{id}
   * @secure
   */
  export namespace QcReferenceControllerFindOne {
    export type RequestParams = {
      /** QcReferenceId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcReference;
  }

  /**
   * No description
   * @tags qcReference
   * @name QcReferenceControllerUpdate
   * @summary Update a qcReference
   * @request PUT:/api/v1/qc-reference/{id}
   * @secure
   */
  export namespace QcReferenceControllerUpdate {
    export type RequestParams = {
      /** QcReferenceId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcReferenceDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcReference;
  }

  /**
   * No description
   * @tags qcReference
   * @name QcReferenceControllerRemove
   * @summary Delete a qcReference
   * @request DELETE:/api/v1/qc-reference/{id}
   * @secure
   */
  export namespace QcReferenceControllerRemove {
    export type RequestParams = {
      /** QcReferenceId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcReferenceType
   * @name QcReferenceTypeControllerCreate
   * @summary Create a new qcReferenceType
   * @request POST:/api/v1/qc-reference-type
   * @secure
   */
  export namespace QcReferenceTypeControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcReferenceTypeDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcReferenceType;
  }

  /**
   * No description
   * @tags qcReferenceType
   * @name QcReferenceTypeControllerFindAll
   * @summary Get all qcReferenceTypes with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-reference-type
   * @secure
   */
  export namespace QcReferenceTypeControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcReferenceTypeControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcReferenceType[];
    };
  }

  /**
   * No description
   * @tags qcReferenceType
   * @name QcReferenceTypeControllerFindOne
   * @summary Get a qcReferenceType by id
   * @request GET:/api/v1/qc-reference-type/{id}
   * @secure
   */
  export namespace QcReferenceTypeControllerFindOne {
    export type RequestParams = {
      /** QcReferenceTypeId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcReferenceType;
  }

  /**
   * No description
   * @tags qcReferenceType
   * @name QcReferenceTypeControllerUpdate
   * @summary Update a qcReferenceType
   * @request PUT:/api/v1/qc-reference-type/{id}
   * @secure
   */
  export namespace QcReferenceTypeControllerUpdate {
    export type RequestParams = {
      /** QcReferenceTypeId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcReferenceTypeDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcReferenceType;
  }

  /**
   * No description
   * @tags qcReferenceType
   * @name QcReferenceTypeControllerRemove
   * @summary Delete a qcReferenceType
   * @request DELETE:/api/v1/qc-reference-type/{id}
   * @secure
   */
  export namespace QcReferenceTypeControllerRemove {
    export type RequestParams = {
      /** QcReferenceTypeId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcReferenceValue
   * @name QcReferenceValueControllerCreate
   * @summary Create a new qcReferenceValue
   * @request POST:/api/v1/qc-reference-value
   * @secure
   */
  export namespace QcReferenceValueControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcReferenceValueDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcReferenceValue;
  }

  /**
   * No description
   * @tags qcReferenceValue
   * @name QcReferenceValueControllerFindAll
   * @summary Get all qcReferenceValues with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-reference-value
   * @secure
   */
  export namespace QcReferenceValueControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcReferenceValueControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcReferenceValue[];
    };
  }

  /**
   * No description
   * @tags qcReferenceValue
   * @name QcReferenceValueControllerFindOne
   * @summary Get a qcReferenceValue by id
   * @request GET:/api/v1/qc-reference-value/{id}
   * @secure
   */
  export namespace QcReferenceValueControllerFindOne {
    export type RequestParams = {
      /** QcReferenceValueId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcReferenceValue;
  }

  /**
   * No description
   * @tags qcReferenceValue
   * @name QcReferenceValueControllerUpdate
   * @summary Update a qcReferenceValue
   * @request PUT:/api/v1/qc-reference-value/{id}
   * @secure
   */
  export namespace QcReferenceValueControllerUpdate {
    export type RequestParams = {
      /** QcReferenceValueId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcReferenceValueDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcReferenceValue;
  }

  /**
   * No description
   * @tags qcReferenceValue
   * @name QcReferenceValueControllerRemove
   * @summary Delete a qcReferenceValue
   * @request DELETE:/api/v1/qc-reference-value/{id}
   * @secure
   */
  export namespace QcReferenceValueControllerRemove {
    export type RequestParams = {
      /** QcReferenceValueId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcReferenceValueType
   * @name QcReferenceValueTypeControllerCreate
   * @summary Create a new qcReferenceValueType
   * @request POST:/api/v1/qc-reference-value-type
   * @secure
   */
  export namespace QcReferenceValueTypeControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcReferenceValueTypeDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcReferenceValueType;
  }

  /**
   * No description
   * @tags qcReferenceValueType
   * @name QcReferenceValueTypeControllerFindAll
   * @summary Get all qcReferenceValueTypes with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-reference-value-type
   * @secure
   */
  export namespace QcReferenceValueTypeControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcReferenceValueTypeControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcReferenceValueType[];
    };
  }

  /**
   * No description
   * @tags qcReferenceValueType
   * @name QcReferenceValueTypeControllerFindOne
   * @summary Get a qcReferenceValueType by id
   * @request GET:/api/v1/qc-reference-value-type/{id}
   * @secure
   */
  export namespace QcReferenceValueTypeControllerFindOne {
    export type RequestParams = {
      /** QcReferenceValueTypeId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcReferenceValueType;
  }

  /**
   * No description
   * @tags qcReferenceValueType
   * @name QcReferenceValueTypeControllerUpdate
   * @summary Update a qcReferenceValueType
   * @request PUT:/api/v1/qc-reference-value-type/{id}
   * @secure
   */
  export namespace QcReferenceValueTypeControllerUpdate {
    export type RequestParams = {
      /** QcReferenceValueTypeId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcReferenceValueTypeDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcReferenceValueType;
  }

  /**
   * No description
   * @tags qcReferenceValueType
   * @name QcReferenceValueTypeControllerRemove
   * @summary Delete a qcReferenceValueType
   * @request DELETE:/api/v1/qc-reference-value-type/{id}
   * @secure
   */
  export namespace QcReferenceValueTypeControllerRemove {
    export type RequestParams = {
      /** QcReferenceValueTypeId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcRule
   * @name QcRuleControllerCreate
   * @summary Create a new qcRule
   * @request POST:/api/v1/qc-rule
   * @secure
   */
  export namespace QcRuleControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcRuleDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcRule;
  }

  /**
   * No description
   * @tags qcRule
   * @name QcRuleControllerFindAll
   * @summary Get all qcRules with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-rule
   * @secure
   */
  export namespace QcRuleControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcRuleControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcRule[];
    };
  }

  /**
   * No description
   * @tags qcRule
   * @name QcRuleControllerFindOne
   * @summary Get a qcRule by id
   * @request GET:/api/v1/qc-rule/{id}
   * @secure
   */
  export namespace QcRuleControllerFindOne {
    export type RequestParams = {
      /** QcRuleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcRule;
  }

  /**
   * No description
   * @tags qcRule
   * @name QcRuleControllerUpdate
   * @summary Update a qcRule
   * @request PUT:/api/v1/qc-rule/{id}
   * @secure
   */
  export namespace QcRuleControllerUpdate {
    export type RequestParams = {
      /** QcRuleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcRuleDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcRule;
  }

  /**
   * No description
   * @tags qcRule
   * @name QcRuleControllerRemove
   * @summary Delete a qcRule
   * @request DELETE:/api/v1/qc-rule/{id}
   * @secure
   */
  export namespace QcRuleControllerRemove {
    export type RequestParams = {
      /** QcRuleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcStatisticalLimits
   * @name QcStatisticalLimitsControllerCreate
   * @summary Create a new qcStatisticalLimits
   * @request POST:/api/v1/qc-statistical-limits
   * @secure
   */
  export namespace QcStatisticalLimitsControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcStatisticalLimitsDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcStatisticalLimits;
  }

  /**
   * No description
   * @tags qcStatisticalLimits
   * @name QcStatisticalLimitsControllerFindAll
   * @summary Get all qcStatisticalLimitss with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-statistical-limits
   * @secure
   */
  export namespace QcStatisticalLimitsControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcStatisticalLimitsControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcStatisticalLimits[];
    };
  }

  /**
   * No description
   * @tags qcStatisticalLimits
   * @name QcStatisticalLimitsControllerFindOne
   * @summary Get a qcStatisticalLimits by id
   * @request GET:/api/v1/qc-statistical-limits/{id}
   * @secure
   */
  export namespace QcStatisticalLimitsControllerFindOne {
    export type RequestParams = {
      /** QcStatisticalLimitsId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcStatisticalLimits;
  }

  /**
   * No description
   * @tags qcStatisticalLimits
   * @name QcStatisticalLimitsControllerUpdate
   * @summary Update a qcStatisticalLimits
   * @request PUT:/api/v1/qc-statistical-limits/{id}
   * @secure
   */
  export namespace QcStatisticalLimitsControllerUpdate {
    export type RequestParams = {
      /** QcStatisticalLimitsId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcStatisticalLimitsDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcStatisticalLimits;
  }

  /**
   * No description
   * @tags qcStatisticalLimits
   * @name QcStatisticalLimitsControllerRemove
   * @summary Delete a qcStatisticalLimits
   * @request DELETE:/api/v1/qc-statistical-limits/{id}
   * @secure
   */
  export namespace QcStatisticalLimitsControllerRemove {
    export type RequestParams = {
      /** QcStatisticalLimitsId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags qcType
   * @name QcTypeControllerCreate
   * @summary Create a new qcType
   * @request POST:/api/v1/qc-type
   * @secure
   */
  export namespace QcTypeControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcTypeDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcType;
  }

  /**
   * No description
   * @tags qcType
   * @name QcTypeControllerFindAll
   * @summary Get all qcTypes with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-type
   * @secure
   */
  export namespace QcTypeControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: QcTypeControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: QcType[];
    };
  }

  /**
   * No description
   * @tags qcType
   * @name QcTypeControllerFindOne
   * @summary Get a qcType by id
   * @request GET:/api/v1/qc-type/{id}
   * @secure
   */
  export namespace QcTypeControllerFindOne {
    export type RequestParams = {
      /** QcTypeId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcType;
  }

  /**
   * No description
   * @tags qcType
   * @name QcTypeControllerUpdate
   * @summary Update a qcType
   * @request PUT:/api/v1/qc-type/{id}
   * @secure
   */
  export namespace QcTypeControllerUpdate {
    export type RequestParams = {
      /** QcTypeId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcTypeDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcType;
  }

  /**
   * No description
   * @tags qcType
   * @name QcTypeControllerRemove
   * @summary Delete a qcType
   * @request DELETE:/api/v1/qc-type/{id}
   * @secure
   */
  export namespace QcTypeControllerRemove {
    export type RequestParams = {
      /** QcTypeId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags assay
   * @name AssayControllerCreate
   * @summary Create a new assay
   * @request POST:/api/v1/assay
   * @secure
   */
  export namespace AssayControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAssayDto;
    export type RequestHeaders = {};
    export type ResponseBody = Assay;
  }

  /**
   * No description
   * @tags assay
   * @name AssayControllerFindAll
   * @summary Get all assays with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay
   * @secure
   */
  export namespace AssayControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: AssayControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Assay[];
    };
  }

  /**
   * No description
   * @tags assay
   * @name AssayControllerFindOne
   * @summary Get a assay by id
   * @request GET:/api/v1/assay/{id}
   * @secure
   */
  export namespace AssayControllerFindOne {
    export type RequestParams = {
      /** AssayId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Assay;
  }

  /**
   * No description
   * @tags assay
   * @name AssayControllerUpdate
   * @summary Update a assay
   * @request PUT:/api/v1/assay/{id}
   * @secure
   */
  export namespace AssayControllerUpdate {
    export type RequestParams = {
      /** AssayId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateAssayDto;
    export type RequestHeaders = {};
    export type ResponseBody = Assay;
  }

  /**
   * No description
   * @tags assay
   * @name AssayControllerRemove
   * @summary Delete a assay
   * @request DELETE:/api/v1/assay/{id}
   * @secure
   */
  export namespace AssayControllerRemove {
    export type RequestParams = {
      /** AssayId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags pivotedAssayResults
   * @name PivotedAssayResultsControllerCreate
   * @summary Create a new pivotedAssayResults
   * @request POST:/api/v1/pivoted-assay-results
   * @secure
   */
  export namespace PivotedAssayResultsControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreatePivotedAssayResultsDto;
    export type RequestHeaders = {};
    export type ResponseBody = PivotedAssayResults;
  }

  /**
   * No description
   * @tags pivotedAssayResults
   * @name PivotedAssayResultsControllerFindAll
   * @summary Get all pivotedAssayResultss with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pivoted-assay-results
   * @secure
   */
  export namespace PivotedAssayResultsControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: PivotedAssayResultsControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: PivotedAssayResults[];
    };
  }

  /**
   * No description
   * @tags pivotedAssayResults
   * @name PivotedAssayResultsControllerFindOne
   * @summary Get a pivotedAssayResults by id
   * @request GET:/api/v1/pivoted-assay-results/{id}
   * @secure
   */
  export namespace PivotedAssayResultsControllerFindOne {
    export type RequestParams = {
      /** PivotedAssayResultsId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PivotedAssayResults;
  }

  /**
   * No description
   * @tags pivotedAssayResults
   * @name PivotedAssayResultsControllerUpdate
   * @summary Update a pivotedAssayResults
   * @request PUT:/api/v1/pivoted-assay-results/{id}
   * @secure
   */
  export namespace PivotedAssayResultsControllerUpdate {
    export type RequestParams = {
      /** PivotedAssayResultsId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePivotedAssayResultsDto;
    export type RequestHeaders = {};
    export type ResponseBody = PivotedAssayResults;
  }

  /**
   * No description
   * @tags pivotedAssayResults
   * @name PivotedAssayResultsControllerRemove
   * @summary Delete a pivotedAssayResults
   * @request DELETE:/api/v1/pivoted-assay-results/{id}
   * @secure
   */
  export namespace PivotedAssayResultsControllerRemove {
    export type RequestParams = {
      /** PivotedAssayResultsId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags pivotedXrfResult
   * @name PivotedXrfResultControllerCreate
   * @summary Create a new pivotedXrfResult
   * @request POST:/api/v1/pivoted-xrf-result
   * @secure
   */
  export namespace PivotedXrfResultControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreatePivotedXrfResultDto;
    export type RequestHeaders = {};
    export type ResponseBody = PivotedXrfResult;
  }

  /**
   * No description
   * @tags pivotedXrfResult
   * @name PivotedXrfResultControllerFindAll
   * @summary Get all pivotedXrfResults with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pivoted-xrf-result
   * @secure
   */
  export namespace PivotedXrfResultControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: PivotedXrfResultControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: PivotedXrfResult[];
    };
  }

  /**
   * No description
   * @tags pivotedXrfResult
   * @name PivotedXrfResultControllerFindOne
   * @summary Get a pivotedXrfResult by id
   * @request GET:/api/v1/pivoted-xrf-result/{id}
   * @secure
   */
  export namespace PivotedXrfResultControllerFindOne {
    export type RequestParams = {
      /** PivotedXrfResultId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PivotedXrfResult;
  }

  /**
   * No description
   * @tags pivotedXrfResult
   * @name PivotedXrfResultControllerUpdate
   * @summary Update a pivotedXrfResult
   * @request PUT:/api/v1/pivoted-xrf-result/{id}
   * @secure
   */
  export namespace PivotedXrfResultControllerUpdate {
    export type RequestParams = {
      /** PivotedXrfResultId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePivotedXrfResultDto;
    export type RequestHeaders = {};
    export type ResponseBody = PivotedXrfResult;
  }

  /**
   * No description
   * @tags pivotedXrfResult
   * @name PivotedXrfResultControllerRemove
   * @summary Delete a pivotedXrfResult
   * @request DELETE:/api/v1/pivoted-xrf-result/{id}
   * @secure
   */
  export namespace PivotedXrfResultControllerRemove {
    export type RequestParams = {
      /** PivotedXrfResultId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags xrf
   * @name XrfControllerCreate
   * @summary Create a new xrf
   * @request POST:/api/v1/xrf
   * @secure
   */
  export namespace XrfControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateXrfDto;
    export type RequestHeaders = {};
    export type ResponseBody = Xrf;
  }

  /**
   * No description
   * @tags xrf
   * @name XrfControllerFindAll
   * @summary Get all xrfs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/xrf
   * @secure
   */
  export namespace XrfControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: XrfControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Xrf[];
    };
  }

  /**
   * No description
   * @tags xrf
   * @name XrfControllerFindOne
   * @summary Get a xrf by id
   * @request GET:/api/v1/xrf/{id}
   * @secure
   */
  export namespace XrfControllerFindOne {
    export type RequestParams = {
      /** XrfId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Xrf;
  }

  /**
   * No description
   * @tags xrf
   * @name XrfControllerUpdate
   * @summary Update a xrf
   * @request PUT:/api/v1/xrf/{id}
   * @secure
   */
  export namespace XrfControllerUpdate {
    export type RequestParams = {
      /** XrfId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateXrfDto;
    export type RequestHeaders = {};
    export type ResponseBody = Xrf;
  }

  /**
   * No description
   * @tags xrf
   * @name XrfControllerRemove
   * @summary Delete a xrf
   * @request DELETE:/api/v1/xrf/{id}
   * @secure
   */
  export namespace XrfControllerRemove {
    export type RequestParams = {
      /** XrfId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags xrfHeader
   * @name XrfHeaderControllerCreate
   * @summary Create a new xrfHeader
   * @request POST:/api/v1/xrf-header
   * @secure
   */
  export namespace XrfHeaderControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateXrfHeaderDto;
    export type RequestHeaders = {};
    export type ResponseBody = XrfHeader;
  }

  /**
   * No description
   * @tags xrfHeader
   * @name XrfHeaderControllerFindAll
   * @summary Get all xrfHeaders with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/xrf-header
   * @secure
   */
  export namespace XrfHeaderControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: XrfHeaderControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: XrfHeader[];
    };
  }

  /**
   * No description
   * @tags xrfHeader
   * @name XrfHeaderControllerFindOne
   * @summary Get a xrfHeader by id
   * @request GET:/api/v1/xrf-header/{id}
   * @secure
   */
  export namespace XrfHeaderControllerFindOne {
    export type RequestParams = {
      /** XrfHeaderId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = XrfHeader;
  }

  /**
   * No description
   * @tags xrfHeader
   * @name XrfHeaderControllerUpdate
   * @summary Update a xrfHeader
   * @request PUT:/api/v1/xrf-header/{id}
   * @secure
   */
  export namespace XrfHeaderControllerUpdate {
    export type RequestParams = {
      /** XrfHeaderId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateXrfHeaderDto;
    export type RequestHeaders = {};
    export type ResponseBody = XrfHeader;
  }

  /**
   * No description
   * @tags xrfHeader
   * @name XrfHeaderControllerRemove
   * @summary Delete a xrfHeader
   * @request DELETE:/api/v1/xrf-header/{id}
   * @secure
   */
  export namespace XrfHeaderControllerRemove {
    export type RequestParams = {
      /** XrfHeaderId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags vwQuickDrillPlan
   * @name VwQuickDrillPlanControllerCreate
   * @summary Create a new vwQuickDrillPlan
   * @request POST:/api/v1/vw-quick-drill-plan
   * @secure
   */
  export namespace VwQuickDrillPlanControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateVwQuickDrillPlanDto;
    export type RequestHeaders = {};
    export type ResponseBody = VwQuickDrillPlan;
  }

  /**
   * No description
   * @tags vwQuickDrillPlan
   * @name VwQuickDrillPlanControllerFindAll
   * @summary Get all vwQuickDrillPlans with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/vw-quick-drill-plan
   * @secure
   */
  export namespace VwQuickDrillPlanControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: VwQuickDrillPlanControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: VwQuickDrillPlan[];
    };
  }

  /**
   * No description
   * @tags vwQuickDrillPlan
   * @name VwQuickDrillPlanControllerFindOne
   * @summary Get a vwQuickDrillPlan by id
   * @request GET:/api/v1/vw-quick-drill-plan/{id}
   * @secure
   */
  export namespace VwQuickDrillPlanControllerFindOne {
    export type RequestParams = {
      /** VwQuickDrillPlanId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VwQuickDrillPlan;
  }

  /**
   * No description
   * @tags vwQuickDrillPlan
   * @name VwQuickDrillPlanControllerUpdate
   * @summary Update a vwQuickDrillPlan
   * @request PUT:/api/v1/vw-quick-drill-plan/{id}
   * @secure
   */
  export namespace VwQuickDrillPlanControllerUpdate {
    export type RequestParams = {
      /** VwQuickDrillPlanId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateVwQuickDrillPlanDto;
    export type RequestHeaders = {};
    export type ResponseBody = VwQuickDrillPlan;
  }

  /**
   * No description
   * @tags vwQuickDrillPlan
   * @name VwQuickDrillPlanControllerRemove
   * @summary Delete a vwQuickDrillPlan
   * @request DELETE:/api/v1/vw-quick-drill-plan/{id}
   * @secure
   */
  export namespace VwQuickDrillPlanControllerRemove {
    export type RequestParams = {
      /** VwQuickDrillPlanId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags vwCollar
   * @name VwCollarControllerCreate
   * @summary Create a new vwCollar
   * @request POST:/api/v1/vw-collar
   * @secure
   */
  export namespace VwCollarControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateVwCollarDto;
    export type RequestHeaders = {};
    export type ResponseBody = VwCollar;
  }

  /**
   * No description
   * @tags vwCollar
   * @name VwCollarControllerFindAll
   * @summary Get all vwCollars with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/vw-collar
   * @secure
   */
  export namespace VwCollarControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: VwCollarControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: VwCollar[];
    };
  }

  /**
   * No description
   * @tags vwCollar
   * @name VwCollarControllerFindOne
   * @summary Get a vwCollar by id
   * @request GET:/api/v1/vw-collar/{id}
   * @secure
   */
  export namespace VwCollarControllerFindOne {
    export type RequestParams = {
      /** VwCollarId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VwCollar;
  }

  /**
   * No description
   * @tags vwCollar
   * @name VwCollarControllerUpdate
   * @summary Update a vwCollar
   * @request PUT:/api/v1/vw-collar/{id}
   * @secure
   */
  export namespace VwCollarControllerUpdate {
    export type RequestParams = {
      /** VwCollarId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateVwCollarDto;
    export type RequestHeaders = {};
    export type ResponseBody = VwCollar;
  }

  /**
   * No description
   * @tags vwCollar
   * @name VwCollarControllerRemove
   * @summary Delete a vwCollar
   * @request DELETE:/api/v1/vw-collar/{id}
   * @secure
   */
  export namespace VwCollarControllerRemove {
    export type RequestParams = {
      /** VwCollarId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags vwQuickDrillHole
   * @name VwQuickDrillHoleControllerCreate
   * @summary Create a new vwQuickDrillHole
   * @request POST:/api/v1/vw-quick-drill-hole
   * @secure
   */
  export namespace VwQuickDrillHoleControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateVwQuickDrillHoleDto;
    export type RequestHeaders = {};
    export type ResponseBody = VwQuickDrillHole;
  }

  /**
   * No description
   * @tags vwQuickDrillHole
   * @name VwQuickDrillHoleControllerFindAll
   * @summary Get all vwQuickDrillHoles with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/vw-quick-drill-hole
   * @secure
   */
  export namespace VwQuickDrillHoleControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: VwQuickDrillHoleControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: VwQuickDrillHole[];
    };
  }

  /**
   * No description
   * @tags vwQuickDrillHole
   * @name VwQuickDrillHoleControllerFindOne
   * @summary Get a vwQuickDrillHole by id
   * @request GET:/api/v1/vw-quick-drill-hole/{id}
   * @secure
   */
  export namespace VwQuickDrillHoleControllerFindOne {
    export type RequestParams = {
      /** VwQuickDrillHoleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VwQuickDrillHole;
  }

  /**
   * No description
   * @tags vwQuickDrillHole
   * @name VwQuickDrillHoleControllerUpdate
   * @summary Update a vwQuickDrillHole
   * @request PUT:/api/v1/vw-quick-drill-hole/{id}
   * @secure
   */
  export namespace VwQuickDrillHoleControllerUpdate {
    export type RequestParams = {
      /** VwQuickDrillHoleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateVwQuickDrillHoleDto;
    export type RequestHeaders = {};
    export type ResponseBody = VwQuickDrillHole;
  }

  /**
   * No description
   * @tags vwQuickDrillHole
   * @name VwQuickDrillHoleControllerRemove
   * @summary Delete a vwQuickDrillHole
   * @request DELETE:/api/v1/vw-quick-drill-hole/{id}
   * @secure
   */
  export namespace VwQuickDrillHoleControllerRemove {
    export type RequestParams = {
      /** VwQuickDrillHoleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags vwDrillPlan
   * @name VwDrillPlanControllerCreate
   * @summary Create a new vwDrillPlan
   * @request POST:/api/v1/vw-drill-plan
   * @secure
   */
  export namespace VwDrillPlanControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateVwDrillPlanDto;
    export type RequestHeaders = {};
    export type ResponseBody = VwDrillPlan;
  }

  /**
   * No description
   * @tags vwDrillPlan
   * @name VwDrillPlanControllerFindAll
   * @summary Get all vwDrillPlans with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/vw-drill-plan
   * @secure
   */
  export namespace VwDrillPlanControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: VwDrillPlanControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: VwDrillPlan[];
    };
  }

  /**
   * No description
   * @tags vwDrillPlan
   * @name VwDrillPlanControllerFindOne
   * @summary Get a vwDrillPlan by id
   * @request GET:/api/v1/vw-drill-plan/{id}
   * @secure
   */
  export namespace VwDrillPlanControllerFindOne {
    export type RequestParams = {
      /** VwDrillPlanId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = VwDrillPlan;
  }

  /**
   * No description
   * @tags vwDrillPlan
   * @name VwDrillPlanControllerUpdate
   * @summary Update a vwDrillPlan
   * @request PUT:/api/v1/vw-drill-plan/{id}
   * @secure
   */
  export namespace VwDrillPlanControllerUpdate {
    export type RequestParams = {
      /** VwDrillPlanId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateVwDrillPlanDto;
    export type RequestHeaders = {};
    export type ResponseBody = VwDrillPlan;
  }

  /**
   * No description
   * @tags vwDrillPlan
   * @name VwDrillPlanControllerRemove
   * @summary Delete a vwDrillPlan
   * @request DELETE:/api/v1/vw-drill-plan/{id}
   * @secure
   */
  export namespace VwDrillPlanControllerRemove {
    export type RequestParams = {
      /** VwDrillPlanId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags uiDrillHole
   * @name UiDrillHoleControllerFindAll
   * @summary Get all uiDrillHoles with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/ui-drill-hole
   * @secure
   */
  export namespace UiDrillHoleControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: UiDrillHoleControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: UiDrillHole[];
    };
  }

  /**
   * No description
   * @tags uiDrillHole
   * @name UiDrillHoleControllerFindOne
   * @summary Get a uiDrillHole by id
   * @request GET:/api/v1/ui-drill-hole/{id}
   * @secure
   */
  export namespace UiDrillHoleControllerFindOne {
    export type RequestParams = {
      /** UiDrillHoleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UiDrillHole;
  }

  /**
   * No description
   * @tags uiDrillHole
   * @name UiDrillHoleControllerUpdate
   * @summary Update a uiDrillHole
   * @request PUT:/api/v1/ui-drill-hole/{id}
   * @secure
   */
  export namespace UiDrillHoleControllerUpdate {
    export type RequestParams = {
      /** UiDrillHoleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateUiDrillHoleDto;
    export type RequestHeaders = {};
    export type ResponseBody = UiDrillHole;
  }

  /**
   * No description
   * @tags uiDrillHole
   * @name UiDrillHoleControllerRemove
   * @summary Delete a uiDrillHole
   * @request DELETE:/api/v1/ui-drill-hole/{id}
   * @secure
   */
  export namespace UiDrillHoleControllerRemove {
    export type RequestParams = {
      /** UiDrillHoleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags uiDrillHole
   * @name UiDrillHoleControllerGetSectionVersion
   * @summary Get section version information for an entity
   * @request GET:/api/v1/ui-drill-hole/section-version/{entityId}
   * @secure
   */
  export namespace UiDrillHoleControllerGetSectionVersion {
    export type RequestParams = {
      /** Entity ID (UUID) */
      entityId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SectionVersionDto[];
  }

  /**
   * No description
   * @tags uiAllSamples
   * @name UiAllSamplesControllerCreate
   * @summary Create a new uiAllSamples
   * @request POST:/api/v1/ui-all-samples
   * @secure
   */
  export namespace UiAllSamplesControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateUiAllSamplesDto;
    export type RequestHeaders = {};
    export type ResponseBody = UiAllSamples;
  }

  /**
   * No description
   * @tags uiAllSamples
   * @name UiAllSamplesControllerFindAll
   * @summary Get all uiAllSampless with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/ui-all-samples
   * @secure
   */
  export namespace UiAllSamplesControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: UiAllSamplesControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: UiAllSamples[];
    };
  }

  /**
   * No description
   * @tags uiAllSamples
   * @name UiAllSamplesControllerFindOne
   * @summary Get a uiAllSamples by id
   * @request GET:/api/v1/ui-all-samples/{id}
   * @secure
   */
  export namespace UiAllSamplesControllerFindOne {
    export type RequestParams = {
      /** UiAllSamplesId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UiAllSamples;
  }

  /**
   * No description
   * @tags uiAllSamples
   * @name UiAllSamplesControllerUpdate
   * @summary Update a uiAllSamples
   * @request PUT:/api/v1/ui-all-samples/{id}
   * @secure
   */
  export namespace UiAllSamplesControllerUpdate {
    export type RequestParams = {
      /** UiAllSamplesId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateUiAllSamplesDto;
    export type RequestHeaders = {};
    export type ResponseBody = UiAllSamples;
  }

  /**
   * No description
   * @tags uiAllSamples
   * @name UiAllSamplesControllerRemove
   * @summary Delete a uiAllSamples
   * @request DELETE:/api/v1/ui-all-samples/{id}
   * @secure
   */
  export namespace UiAllSamplesControllerRemove {
    export type RequestParams = {
      /** UiAllSamplesId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * @description Returns all QAQC insertion rules for the specified laboratory code
   * @tags Custom QAQC Insertion Rules
   * @name QaqcInsertionRulesControllerFindByLaboratory
   * @summary Fetch QAQC insertion rules by laboratory
   * @request GET:/api/v1/api/qaqc-insertion-rules/{laboratory}
   * @secure
   */
  export namespace QaqcInsertionRulesControllerFindByLaboratory {
    export type RequestParams = {
      /** Laboratory code (e.g., "ALS", "SGS") */
      laboratory: string;
    };
    export type RequestQuery = {
      /** Include inactive rules in results (default: false) */
      includeInactive?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = QcInsertionRule[];
  }

  /**
   * @description Creates a new quality control sample insertion rule for a laboratory
   * @tags Custom QAQC Insertion Rules
   * @name QaqcInsertionRulesControllerCreate
   * @summary Create new QAQC insertion rule
   * @request POST:/api/v1/api/qaqc-insertion-rules
   * @secure
   */
  export namespace QaqcInsertionRulesControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateQcInsertionRuleDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcInsertionRule;
  }

  /**
   * @description Updates an existing quality control sample insertion rule
   * @tags Custom QAQC Insertion Rules
   * @name QaqcInsertionRulesControllerUpdate
   * @summary Update QAQC insertion rule
   * @request PUT:/api/v1/api/qaqc-insertion-rules/{id}
   * @secure
   */
  export namespace QaqcInsertionRulesControllerUpdate {
    export type RequestParams = {
      /** QCInsertionRuleId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateQcInsertionRuleDto;
    export type RequestHeaders = {};
    export type ResponseBody = QcInsertionRule;
  }

  /**
   * @description Executes QAQC.sp_CalculateDuplicateRSD to calculate Relative Percent Difference (RPD) and Relative Standard Deviation (RSD) for duplicate samples. Returns base columns plus dynamic element-specific columns: - Base columns: DuplicateSampleId, OriginalSampleId, SampledDt, LabCode, BatchNo - Dynamic columns: {Element}_RPD, {Element}_RSD, {Element}_OriginalValue, {Element}_DuplicateValue for each element Used for: - Duplicate QC performance assessment - Precision monitoring by element - Lab precision comparison - Batch precision validation
   * @tags QAQC - Duplicate Precision
   * @name SpCalculateDuplicateRsdControllerExecute
   * @summary Calculate duplicate precision metrics (RPD/RSD)
   * @request POST:/api/v1/sp-calculate-duplicate-rsd/execute
   * @secure
   */
  export namespace SpCalculateDuplicateRsdControllerExecute {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = {
      /**
       * Filter by specific batch number
       * @example "AB12345"
       */
      BatchNo?: string;
      /**
       * Filter by laboratory code
       * @example "ALS"
       */
      LabCode?: string;
      /**
       * Filter by element (comma-separated for multiple)
       * @example "Au,Cu,Ag"
       */
      Element?: string;
      /**
       * Start date filter (YYYY-MM-DD)
       * @format date
       * @example "2025-01-01"
       */
      DateFrom?: string;
      /**
       * End date filter (YYYY-MM-DD)
       * @format date
       * @example "2025-12-31"
       */
      DateTo?: string;
    };
    export type RequestHeaders = {};
    export type ResponseBody = SpCalculateDuplicateRsd[];
  }

  /**
   * @description Executes QAQC.sp_CalculateDuplicateRSD with pagination support. Use query parameters to filter results.
   * @tags QAQC - Duplicate Precision
   * @name SpCalculateDuplicateRsdControllerFindAll
   * @summary Calculate duplicate precision metrics with pagination
   * @request GET:/api/v1/sp-calculate-duplicate-rsd
   * @secure
   */
  export namespace SpCalculateDuplicateRsdControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Page number (starts at 1)
       * @min 1
       * @default 1
       * @example 1
       */
      page?: number;
      /**
       * Number of records per page
       * @min 1
       * @max 1000000
       * @default 10
       * @example 50
       */
      take?: number;
      /** @default "ASC" */
      order?: SpCalculateDuplicateRsdControllerFindAllParamsOrderEnum;
      search?: string;
      filters?: string;
      sorts?: string;
      /** End date (YYYY-MM-DD) */
      DateTo?: string;
      /** Start date (YYYY-MM-DD) */
      DateFrom?: string;
      /** Filter by element(s) */
      Element?: string;
      /** Filter by lab code */
      LabCode?: string;
      /** Filter by batch number */
      BatchNo?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SpCalculateDuplicateRsd[];
  }

  /**
   * @description Executes QAQC.sp_GetGradeRange to retrieve grade range classifications. Grade ranges define: - Low/Medium/High grade bins for elements - Grade-based QC acceptance criteria - Element-specific thresholds Used for: - QC filtering by sample grade - Duplicate acceptance criteria (grade-dependent RPD thresholds) - Detection limit configurations - Grade-based reporting
   * @tags QAQC - Grade Ranges
   * @name SpGetGradeRangeControllerExecute
   * @summary Get grade range classifications
   * @request POST:/api/v1/sp-get-grade-range/execute
   * @secure
   */
  export namespace SpGetGradeRangeControllerExecute {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = {
      /**
       * Filter by specific element
       * @example "Au"
       */
      Element?: string;
      /**
       * Filter by laboratory code (NULL = applies to all labs)
       * @example "ALS"
       */
      LabCode?: string;
      /**
       * Filter by type (e.g., GRADE_BIN, DETECTION_LIMIT)
       * @example "GRADE_BIN"
       */
      FilterType?: string;
      /**
       * Date to check active ranges (defaults to current date)
       * @format date
       * @example "2025-01-01"
       */
      AsOfDate?: string;
    };
    export type RequestHeaders = {};
    export type ResponseBody = SpGetGradeRange[];
  }

  /**
   * @description Executes QAQC.sp_GetGradeRange with pagination support. Use query parameters to filter results.
   * @tags QAQC - Grade Ranges
   * @name SpGetGradeRangeControllerFindAll
   * @summary Get grade range classifications with pagination
   * @request GET:/api/v1/sp-get-grade-range
   * @secure
   */
  export namespace SpGetGradeRangeControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Page number (starts at 1)
       * @min 1
       * @default 1
       * @example 1
       */
      page?: number;
      /**
       * Number of records per page
       * @min 1
       * @max 1000000
       * @default 10
       * @example 50
       */
      take?: number;
      /** @default "ASC" */
      order?: SpGetGradeRangeControllerFindAllParamsOrderEnum;
      search?: string;
      filters?: string;
      sorts?: string;
      /** Filter by type */
      FilterType?: string;
      /** Filter by lab code */
      LabCode?: string;
      /** Filter by element */
      Element?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SpGetGradeRange[];
  }

  /**
   * @description Retrieves only currently active grade ranges for the specified element based on EffectiveDt and ExpiryDt.
   * @tags QAQC - Grade Ranges
   * @name SpGetGradeRangeControllerGetActiveRanges
   * @summary Get active grade ranges for an element
   * @request GET:/api/v1/sp-get-grade-range/active/{element}
   * @secure
   */
  export namespace SpGetGradeRangeControllerGetActiveRanges {
    export type RequestParams = {
      /**
       * Element symbol (e.g., Au, Cu)
       * @example "Au"
       */
      element: string;
    };
    export type RequestQuery = {
      /** Optional lab code filter */
      labCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SpGetGradeRange[];
  }

  /**
   * @description Determines which grade range (Low/Medium/High) a specific assay value falls into for an element.
   * @tags QAQC - Grade Ranges
   * @name SpGetGradeRangeControllerClassifyGrade
   * @summary Classify a grade value into its range
   * @request GET:/api/v1/sp-get-grade-range/classify/{element}/{value}
   * @secure
   */
  export namespace SpGetGradeRangeControllerClassifyGrade {
    export type RequestParams = {
      /**
       * Element symbol
       * @example "Au"
       */
      element: string;
      /**
       * Grade value to classify
       * @example "1.25"
       */
      value: number;
    };
    export type RequestQuery = {
      /** Optional lab code filter */
      labCode?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SpGetGradeRange;
  }

  /**
   * No description
   * @tags spGetHoleValidation
   * @name SpGetHoleValidationControllerFindAll
   * @summary Execute sp_GetHoleValidation stored procedure with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sp-get-hole-validation
   * @secure
   */
  export namespace SpGetHoleValidationControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SpGetHoleValidationControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: SpGetHoleValidation[];
    };
  }

  /**
   * No description
   * @tags spGetHoleValidation
   * @name SpGetHoleValidationControllerFindAllRaw
   * @summary Execute sp_GetHoleValidation stored procedure and return all results
   * @request GET:/api/v1/sp-get-hole-validation/raw
   * @secure
   */
  export namespace SpGetHoleValidationControllerFindAllRaw {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SpGetHoleValidation[];
  }

  /**
   * @description Retrieves aggregated QC metrics for dashboard visualization. **Returns Two Result Sets:** 1. **Time Series Data:** - QC metrics aggregated by period (daily/weekly/monthly/batch) - Grouped by element and QC type - Includes failure rates, Z-Scores (standards), RPD (duplicates), blank values 2. **Summary Statistics:** - Overall QC sample count - Average failure rate - Average Z-Score for standards - Average RPD for duplicates - Number of active labs - Number of elements tested - Date range information **Aggregation Levels:** - `DAILY`: Aggregate by calendar day - `WEEKLY`: Aggregate by week (Monday start) - `MONTHLY`: Aggregate by calendar month - `BATCH`: Aggregate by lab batch number **Use Cases:** - Executive QC dashboards - Laboratory performance monitoring - Trend analysis over time - Multi-lab comparison - Element-specific QC tracking **Metrics Included:** - Pass/Warn/Fail counts - Failure rate percentages - Z-Score statistics (for standards) - RPD statistics (for duplicates) - Blank contamination levels
   * @tags QAQC - Global Dashboard
   * @name SpGlobalDashboardControllerExecute
   * @summary Get global QAQC dashboard data
   * @request POST:/api/v1/qaqc/global-dashboard
   * @secure
   */
  export namespace SpGlobalDashboardControllerExecute {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SpGlobalDashboardRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = SpGlobalDashboardResponseDto;
  }

  /**
   * No description
   * @tags spGetHoleValidationEnhanced
   * @name SpGetHoleValidationEnhancedControllerFindAll
   * @summary Execute sp_GetHoleValidation_Enhanced stored procedure with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sp-get-hole-validation-enhanced
   * @secure
   */
  export namespace SpGetHoleValidationEnhancedControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: SpGetHoleValidationEnhancedControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: SpGetHoleValidationEnhanced[];
    };
  }

  /**
   * No description
   * @tags spGetHoleValidationEnhanced
   * @name SpGetHoleValidationEnhancedControllerFindAllRaw
   * @summary Execute sp_GetHoleValidation_Enhanced stored procedure and return all results
   * @request GET:/api/v1/sp-get-hole-validation-enhanced/raw
   * @secure
   */
  export namespace SpGetHoleValidationEnhancedControllerFindAllRaw {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SpGetHoleValidationEnhanced[];
  }

  /**
   * @description Executes sp_GetGlobalCharts to retrieve three types of QAQC chart data: **Result Set 1: Shewhart Control Chart Data** - Standards measurements with control limits (UCL, UWL, LWL, LCL) - Control status monitoring (In Control, Warning, Out of Control) - Time series data for quality control charts **Result Set 2: Duplicate Correlation Data** - Original vs. duplicate sample values - Precision metrics (absolute and relative differences) - Scatter plot data for duplicate analysis **Result Set 3: Bias Trend Data** - Monthly bias aggregations by laboratory - Average bias, standard deviation, and sample counts - Trend analysis for laboratory performance monitoring **Parameters:** - StartDate/EndDate: Define the analysis period (required) - StandardId: Filter by specific standard reference (optional) - Element: Chemical element to analyze (default: Au - Gold) - LabCode: Filter by laboratory code (optional)
   * @tags QAQC - Global Charts
   * @name SpGetGlobalChartsControllerExecute
   * @summary Get comprehensive QAQC charts data
   * @request POST:/api/v1/qaqc/global-charts
   * @secure
   */
  export namespace SpGetGlobalChartsControllerExecute {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SpGetGlobalChartsRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = SpGetGlobalChartsResponseDto;
  }

  /**
   * @description Generates a unique dispatch number for a laboratory. **Dispatch Number Format:** - Pattern: {LabCode}_{Year}_{SequenceNo} - Example: ALS_2025_0001 - Sequence auto-increments for each lab/year combination **How It Works:** - Queries existing dispatch numbers for the lab and current year - Finds the maximum sequence number - Increments and returns new number - Thread-safe using database locks **When to Use:** - Typically called automatically by sp_CreateLabDispatch - Can be used for pre-generating numbers if needed - Useful for testing dispatch number formats **Important Notes:** - Each call generates a NEW unique number - Numbers are not reserved - use immediately - Gaps in sequence are possible if dispatch creation fails
   * @tags Sample - Lab Dispatch Utilities
   * @name SpGenerateDispatchNumberControllerGenerate
   * @summary Generate unique dispatch number
   * @request POST:/api/v1/sample/lab-dispatch/generate-number
   * @secure
   */
  export namespace SpGenerateDispatchNumberControllerGenerate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GenerateDispatchNumberRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = GenerateDispatchNumberResponseDto;
  }

  /**
   * @description Creates a new lab dispatch with auto-generated dispatch number. **Dispatch Number Format:** {LabCode}_{Year}_{SequenceNo} Example: ALS_2025_0001 **Transaction Behavior:** - Atomically creates dispatch record - Generates unique dispatch number using sequence - Returns row version for optimistic concurrency control - Rolls back on any error **Use Cases:** - Creating sample dispatch for laboratory submission - Tracking sample shipments to external labs - Managing drill hole sample logistics **Next Steps:** After creating a dispatch: 1. Use the returned `dispatchNumber` for tracking 2. Save the `rowVersion` for future updates 3. Add samples using POST /sample/dispatch/{id}/samples 4. Update status using PATCH /sample/dispatch/{id}/status
   * @tags Sample - Lab Dispatch
   * @name SpCreateLabDispatchControllerCreate
   * @summary Create new lab dispatch
   * @request POST:/api/v1/sample/lab-dispatch
   * @secure
   */
  export namespace SpCreateLabDispatchControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateLabDispatchRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateLabDispatchResponseDto;
  }

  /**
   * @description Retrieves all lab dispatches for a specific drill hole/collar. **Response Structure:** Each dispatch includes: - Header information (dispatch number, status, dates, etc.) - Nested samples as JSON array (SamplesJson field) - Sample details (sample name, depths, weight, type, status) **Use Cases:** - View complete dispatch history for a drill hole - Track sample shipment status - Audit dispatch and sample tracking - Generate dispatch reports **Ordering:** Results are ordered by: 1. Dispatch date (descending - most recent first) 2. Created date (descending) **JSON Sub-query:** The `SamplesJson` field contains an array of samples: ```json { "SampleId": "...", "SampleNm": "...", "DepthFrom": 10.5, "DepthTo": 11.0, "SampleWeight": 2.5, "SampleType": "CORE", "DispatchSequence": 1, "DispatchStatus": "Pending" } ```
   * @tags Sample - Lab Dispatch Queries
   * @name SpGetLabDispatchByCollarControllerGetByCollar
   * @summary Get lab dispatches by collar
   * @request POST:/api/v1/sample/lab-dispatch/by-collar
   * @secure
   */
  export namespace SpGetLabDispatchByCollarControllerGetByCollar {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GetLabDispatchByCollarRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = SpGetLabDispatchByCollar[];
  }

  /**
   * @description Updates lab dispatch status with optimistic concurrency control. **Optimistic Locking:** - Requires current row version to prevent concurrent updates - Returns new row version after successful update - Throws 409 Conflict if row version doesn't match **Status Workflow:** ``` Draft → Submitted → Received → Complete ↓         ↓         ↓ Cancelled (terminal) ``` **Validation Rules:** - Cannot modify completed dispatches - Some status transitions may be restricted - Lab received date is automatically set when status becomes 'Received' **Use Cases:** - Mark dispatch as submitted when ready to send - Update to received when lab confirms receipt - Mark as complete when analysis is finished - Cancel dispatch if no longer needed **After Status Update:** - Save the returned `newRowVersion` for next update - Dispatch may trigger automated notifications - Lab received date updates automatically
   * @tags Sample - Lab Dispatch
   * @name SpUpdateLabDispatchStatusControllerUpdateStatus
   * @summary Update dispatch status
   * @request PATCH:/api/v1/sample/lab-dispatch/{id}/status
   * @secure
   */
  export namespace SpUpdateLabDispatchStatusControllerUpdateStatus {
    export type RequestParams = {
      /**
       * Lab dispatch ID
       * @format uuid
       * @example "550e8400-e29b-41d4-a716-446655440000"
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateLabDispatchStatusRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateLabDispatchStatusResponseDto;
  }

  /**
   * @description Soft deletes a lab dispatch and all associated sample dispatches. **Soft Delete Behavior:** - Sets ActiveInd = 0 (marks as inactive) - Records remain in database for audit trail - Associated sample dispatches also soft deleted - Can potentially be restored by database administrator **Optimistic Locking:** - Requires current row version to prevent conflicts - Throws 409 Conflict if row version doesn't match - Prevents accidental deletion of modified records **What Gets Deleted:** - Lab dispatch record (soft deleted) - All associated sample dispatch records (soft deleted) - Sample tracking updated (dispatch count decremented) **Use Cases:** - Cancel a dispatch that was created in error - Remove draft dispatches no longer needed - Clean up test/duplicate dispatches **Important Notes:** - This is irreversible through the API (requires DB admin to restore) - Dispatch must not be in 'Complete' status - Associated samples are unaffected (only the dispatch linkage is removed)
   * @tags Sample - Lab Dispatch
   * @name SpDeleteLabDispatchControllerDelete
   * @summary Soft delete lab dispatch
   * @request DELETE:/api/v1/sample/lab-dispatch/{id}
   * @secure
   */
  export namespace SpDeleteLabDispatchControllerDelete {
    export type RequestParams = {
      /**
       * Lab dispatch ID to delete
       * @format uuid
       * @example "550e8400-e29b-41d4-a716-446655440000"
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DeleteLabDispatchRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * @description Retrieves samples from a drill hole that are eligible for dispatch to a laboratory. **Eligibility Criteria:** - Sample must be in 'Complete' status (RowStatus >= 1) - Sample must be active (not deleted) - Sample must belong to the specified collar/drill hole - Optionally: Sample has not been previously dispatched **Ordering:** Results are ordered by: 1. DepthFrom (ascending - shallowest first) 2. DepthTo (ascending) **Use Cases:** - Select samples for adding to a new dispatch - Identify which samples are ready for laboratory submission - Track sample processing workflow - Generate dispatch preparation lists **Include Already Dispatched:** - `false` (default): Only samples never dispatched or DispatchCount = 0 - `true`: All eligible samples, including previously dispatched ones **Response Fields:** - Sample details (ID, name, depths, weight, type) - Dispatch tracking (last dispatch date, dispatch count, dispatch number) - Sample status information **Typical Workflow:** 1. Call this endpoint to get eligible samples 2. User selects samples to dispatch 3. Create dispatch using POST /sample/lab-dispatch 4. Add selected samples using POST /sample/lab-dispatch/{id}/samples
   * @tags Sample - Lab Dispatch Queries
   * @name SpGetSamplesForDispatchControllerGetEligibleSamples
   * @summary Get samples eligible for dispatch
   * @request POST:/api/v1/sample/lab-dispatch/eligible-samples
   * @secure
   */
  export namespace SpGetSamplesForDispatchControllerGetEligibleSamples {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GetSamplesForDispatchRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = SpGetSamplesForDispatch[];
  }

  /**
   * @description Bulk adds samples to an existing lab dispatch. **Transaction Behavior:** - All-or-nothing operation (atomic) - Validates all samples exist and are eligible - Updates dispatch totals automatically - Assigns dispatch sequence numbers - Rolls back on any error **Sample Eligibility:** - Sample must exist in database - Sample must be in 'Complete' status (RowStatus >= 1) - Sample can be dispatched multiple times if needed **Use Cases:** - Adding core samples to a dispatch for lab analysis - Bulk sample submission to external laboratories - Managing sample logistics and tracking **Input Format:** Comma-separated UUIDs without spaces: `660e8400-e29b-41d4-a716-446655440001,770e8400-e29b-41d4-a716-446655440002` **After Adding Samples:** - Samples are tracked with dispatch number - Dispatch totals are automatically updated - Sample dispatch history is maintained
   * @tags Sample - Lab Dispatch
   * @name SpAddSamplesToDispatchControllerAddSamples
   * @summary Add samples to dispatch
   * @request POST:/api/v1/sample/lab-dispatch/{id}/samples
   * @secure
   */
  export namespace SpAddSamplesToDispatchControllerAddSamples {
    export type RequestParams = {
      /**
       * Lab dispatch ID
       * @format uuid
       * @example "550e8400-e29b-41d4-a716-446655440000"
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AddSamplesToDispatchRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags applicationLog
   * @name ApplicationLogControllerCreate
   * @summary Create a new applicationLog
   * @request POST:/api/v1/application-log
   * @secure
   */
  export namespace ApplicationLogControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateApplicationLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = ApplicationLog;
  }

  /**
   * No description
   * @tags applicationLog
   * @name ApplicationLogControllerFindAll
   * @summary Get all applicationLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/application-log
   * @secure
   */
  export namespace ApplicationLogControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: ApplicationLogControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: ApplicationLog[];
    };
  }

  /**
   * No description
   * @tags applicationLog
   * @name ApplicationLogControllerFindOne
   * @summary Get a applicationLog by id
   * @request GET:/api/v1/application-log/{id}
   * @secure
   */
  export namespace ApplicationLogControllerFindOne {
    export type RequestParams = {
      /** ApplicationLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ApplicationLog;
  }

  /**
   * No description
   * @tags applicationLog
   * @name ApplicationLogControllerUpdate
   * @summary Update a applicationLog
   * @request PUT:/api/v1/application-log/{id}
   * @secure
   */
  export namespace ApplicationLogControllerUpdate {
    export type RequestParams = {
      /** ApplicationLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateApplicationLogDto;
    export type RequestHeaders = {};
    export type ResponseBody = ApplicationLog;
  }

  /**
   * No description
   * @tags applicationLog
   * @name ApplicationLogControllerRemove
   * @summary Delete a applicationLog
   * @request DELETE:/api/v1/application-log/{id}
   * @secure
   */
  export namespace ApplicationLogControllerRemove {
    export type RequestParams = {
      /** ApplicationLogId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags config
   * @name ConfigControllerCreate
   * @summary Create a new config
   * @request POST:/api/v1/config
   * @secure
   */
  export namespace ConfigControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateConfigDto;
    export type RequestHeaders = {};
    export type ResponseBody = Config;
  }

  /**
   * No description
   * @tags config
   * @name ConfigControllerFindAll
   * @summary Get all configs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/config
   * @secure
   */
  export namespace ConfigControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: ConfigControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Config[];
    };
  }

  /**
   * No description
   * @tags config
   * @name ConfigControllerFindOne
   * @summary Get a config by id
   * @request GET:/api/v1/config/{id}
   * @secure
   */
  export namespace ConfigControllerFindOne {
    export type RequestParams = {
      /** ConfigId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Config;
  }

  /**
   * No description
   * @tags config
   * @name ConfigControllerUpdate
   * @summary Update a config
   * @request PUT:/api/v1/config/{id}
   * @secure
   */
  export namespace ConfigControllerUpdate {
    export type RequestParams = {
      /** ConfigId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateConfigDto;
    export type RequestHeaders = {};
    export type ResponseBody = Config;
  }

  /**
   * No description
   * @tags config
   * @name ConfigControllerRemove
   * @summary Delete a config
   * @request DELETE:/api/v1/config/{id}
   * @secure
   */
  export namespace ConfigControllerRemove {
    export type RequestParams = {
      /** ConfigId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags lookUpNormalization
   * @name LookUpNormalizationControllerCreate
   * @summary Create a new lookUpNormalization
   * @request POST:/api/v1/look-up-normalization
   * @secure
   */
  export namespace LookUpNormalizationControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateLookUpNormalizationDto;
    export type RequestHeaders = {};
    export type ResponseBody = LookUpNormalization;
  }

  /**
   * No description
   * @tags lookUpNormalization
   * @name LookUpNormalizationControllerFindAll
   * @summary Get all lookUpNormalizations with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/look-up-normalization
   * @secure
   */
  export namespace LookUpNormalizationControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: LookUpNormalizationControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: LookUpNormalization[];
    };
  }

  /**
   * No description
   * @tags lookUpNormalization
   * @name LookUpNormalizationControllerFindOne
   * @summary Get a lookUpNormalization by id
   * @request GET:/api/v1/look-up-normalization/{id}
   * @secure
   */
  export namespace LookUpNormalizationControllerFindOne {
    export type RequestParams = {
      /** LookUpNormalizationId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = LookUpNormalization;
  }

  /**
   * No description
   * @tags lookUpNormalization
   * @name LookUpNormalizationControllerUpdate
   * @summary Update a lookUpNormalization
   * @request PUT:/api/v1/look-up-normalization/{id}
   * @secure
   */
  export namespace LookUpNormalizationControllerUpdate {
    export type RequestParams = {
      /** LookUpNormalizationId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateLookUpNormalizationDto;
    export type RequestHeaders = {};
    export type ResponseBody = LookUpNormalization;
  }

  /**
   * No description
   * @tags lookUpNormalization
   * @name LookUpNormalizationControllerRemove
   * @summary Delete a lookUpNormalization
   * @request DELETE:/api/v1/look-up-normalization/{id}
   * @secure
   */
  export namespace LookUpNormalizationControllerRemove {
    export type RequestParams = {
      /** LookUpNormalizationId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags pickList
   * @name PickListControllerCreate
   * @summary Create a new pickList
   * @request POST:/api/v1/pick-list
   * @secure
   */
  export namespace PickListControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreatePickListDto;
    export type RequestHeaders = {};
    export type ResponseBody = PickList;
  }

  /**
   * No description
   * @tags pickList
   * @name PickListControllerFindAll
   * @summary Get all pickLists with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pick-list
   * @secure
   */
  export namespace PickListControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: PickListControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: PickList[];
    };
  }

  /**
   * No description
   * @tags pickList
   * @name PickListControllerFindOne
   * @summary Get a pickList by id
   * @request GET:/api/v1/pick-list/{id}
   * @secure
   */
  export namespace PickListControllerFindOne {
    export type RequestParams = {
      /** PickListId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PickList;
  }

  /**
   * No description
   * @tags pickList
   * @name PickListControllerUpdate
   * @summary Update a pickList
   * @request PUT:/api/v1/pick-list/{id}
   * @secure
   */
  export namespace PickListControllerUpdate {
    export type RequestParams = {
      /** PickListId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePickListDto;
    export type RequestHeaders = {};
    export type ResponseBody = PickList;
  }

  /**
   * No description
   * @tags pickList
   * @name PickListControllerRemove
   * @summary Delete a pickList
   * @request DELETE:/api/v1/pick-list/{id}
   * @secure
   */
  export namespace PickListControllerRemove {
    export type RequestParams = {
      /** PickListId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags pickListUser
   * @name PickListUserControllerCreate
   * @summary Create a new pickListUser
   * @request POST:/api/v1/pick-list-user
   * @secure
   */
  export namespace PickListUserControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreatePickListUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = PickListUser;
  }

  /**
   * No description
   * @tags pickListUser
   * @name PickListUserControllerFindAll
   * @summary Get all pickListUsers with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pick-list-user
   * @secure
   */
  export namespace PickListUserControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: PickListUserControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: PickListUser[];
    };
  }

  /**
   * No description
   * @tags pickListUser
   * @name PickListUserControllerFindOne
   * @summary Get a pickListUser by id
   * @request GET:/api/v1/pick-list-user/{id}
   * @secure
   */
  export namespace PickListUserControllerFindOne {
    export type RequestParams = {
      /** PickListUserId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PickListUser;
  }

  /**
   * No description
   * @tags pickListUser
   * @name PickListUserControllerUpdate
   * @summary Update a pickListUser
   * @request PUT:/api/v1/pick-list-user/{id}
   * @secure
   */
  export namespace PickListUserControllerUpdate {
    export type RequestParams = {
      /** PickListUserId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePickListUserDto;
    export type RequestHeaders = {};
    export type ResponseBody = PickListUser;
  }

  /**
   * No description
   * @tags pickListUser
   * @name PickListUserControllerRemove
   * @summary Delete a pickListUser
   * @request DELETE:/api/v1/pick-list-user/{id}
   * @secure
   */
  export namespace PickListUserControllerRemove {
    export type RequestParams = {
      /** PickListUserId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags pickListValue
   * @name PickListValueControllerCreate
   * @summary Create a new pickListValue
   * @request POST:/api/v1/pick-list-value
   * @secure
   */
  export namespace PickListValueControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreatePickListValueDto;
    export type RequestHeaders = {};
    export type ResponseBody = PickListValue;
  }

  /**
   * No description
   * @tags pickListValue
   * @name PickListValueControllerFindAll
   * @summary Get all pickListValues with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pick-list-value
   * @secure
   */
  export namespace PickListValueControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: PickListValueControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: PickListValue[];
    };
  }

  /**
   * No description
   * @tags pickListValue
   * @name PickListValueControllerFindOne
   * @summary Get a pickListValue by id
   * @request GET:/api/v1/pick-list-value/{id}
   * @secure
   */
  export namespace PickListValueControllerFindOne {
    export type RequestParams = {
      /** PickListValueId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PickListValue;
  }

  /**
   * No description
   * @tags pickListValue
   * @name PickListValueControllerUpdate
   * @summary Update a pickListValue
   * @request PUT:/api/v1/pick-list-value/{id}
   * @secure
   */
  export namespace PickListValueControllerUpdate {
    export type RequestParams = {
      /** PickListValueId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePickListValueDto;
    export type RequestHeaders = {};
    export type ResponseBody = PickListValue;
  }

  /**
   * No description
   * @tags pickListValue
   * @name PickListValueControllerRemove
   * @summary Delete a pickListValue
   * @request DELETE:/api/v1/pick-list-value/{id}
   * @secure
   */
  export namespace PickListValueControllerRemove {
    export type RequestParams = {
      /** PickListValueId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }

  /**
   * No description
   * @tags template
   * @name TemplateControllerCreate
   * @summary Create a new template
   * @request POST:/api/v1/template
   * @secure
   */
  export namespace TemplateControllerCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateTemplateDto;
    export type RequestHeaders = {};
    export type ResponseBody = Template;
  }

  /**
   * No description
   * @tags template
   * @name TemplateControllerFindAll
   * @summary Get all templates with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/template
   * @secure
   */
  export namespace TemplateControllerFindAll {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @default 1
       */
      page?: number;
      /**
       * @min 1
       * @max 1000000
       * @default 10
       */
      take?: number;
      order?: TemplateControllerFindAllParamsOrderEnum;
      search?: string;
      /** JSON string of filters */
      filters?: string;
      /** JSON string of sorts */
      sorts?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PageDto & {
      data?: Template[];
    };
  }

  /**
   * No description
   * @tags template
   * @name TemplateControllerFindOne
   * @summary Get a template by id
   * @request GET:/api/v1/template/{id}
   * @secure
   */
  export namespace TemplateControllerFindOne {
    export type RequestParams = {
      /** TemplateId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Template;
  }

  /**
   * No description
   * @tags template
   * @name TemplateControllerUpdate
   * @summary Update a template
   * @request PUT:/api/v1/template/{id}
   * @secure
   */
  export namespace TemplateControllerUpdate {
    export type RequestParams = {
      /** TemplateId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateTemplateDto;
    export type RequestHeaders = {};
    export type ResponseBody = Template;
  }

  /**
   * No description
   * @tags template
   * @name TemplateControllerRemove
   * @summary Delete a template
   * @request DELETE:/api/v1/template/{id}
   * @secure
   */
  export namespace TemplateControllerRemove {
    export type RequestParams = {
      /** TemplateId (UUID) */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}
