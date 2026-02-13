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
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags user
   * @name UserControllerCreate
   * @summary Create a new user
   * @request POST:/api/v1/user
   * @secure
   */
  userControllerCreate = (data: CreateUserDto, params: RequestParams = {}) =>
    this.request<User, void>({
      path: `/api/v1/user`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UserControllerFindAll
   * @summary Get all users with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/user
   * @secure
   */
  userControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: User[];
      },
      any
    >({
      path: `/api/v1/user`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UserControllerFindOne
   * @summary Get a user by id
   * @request GET:/api/v1/user/{id}
   * @secure
   */
  userControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<User, void>({
      path: `/api/v1/user/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UserControllerUpdate
   * @summary Update a user
   * @request PUT:/api/v1/user/{id}
   * @secure
   */
  userControllerUpdate = (
    id: string,
    data: UpdateUserDto,
    params: RequestParams = {},
  ) =>
    this.request<User, void>({
      path: `/api/v1/user/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags user
   * @name UserControllerRemove
   * @summary Delete a user
   * @request DELETE:/api/v1/user/{id}
   * @secure
   */
  userControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/user/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags authentication
   * @name AuthControllerLogin
   * @summary Login with username and password
   * @request POST:/api/v1/auth/login
   */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.request<LoginResponseDto, void>({
      path: `/api/v1/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags authentication
   * @name AuthControllerRefresh
   * @summary Refresh access token using refresh token
   * @request POST:/api/v1/auth/refresh
   */
  authControllerRefresh = (data: RefreshTokenDto, params: RequestParams = {}) =>
    this.request<RefreshResponseDto, void>({
      path: `/api/v1/auth/refresh`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags authentication
   * @name AuthControllerGetLookUpTable
   * @summary Get all LookUp tables from cache
   * @request GET:/api/v1/auth/lookup-table2
   * @secure
   */
  authControllerGetLookUpTable = (params: RequestParams = {}) =>
    this.request<LookupTableResponse, any>({
      path: `/api/v1/auth/lookup-table2`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags authentication
   * @name AuthControllerGetLookUpTable2
   * @summary Get all LookUp tables from cache
   * @request GET:/api/v1/auth/lookup-table
   * @secure
   */
  authControllerGetLookUpTable2 = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/auth/lookup-table`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags authentication
   * @name AuthControllerGetUserInfo
   * @summary Get current user information
   * @request GET:/api/v1/auth/user-info
   * @secure
   */
  authControllerGetUserInfo = (params: RequestParams = {}) =>
    this.request<
      {
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
      },
      void
    >({
      path: `/api/v1/auth/user-info`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags holeNmPrefix
   * @name HoleNmPrefixControllerCreate
   * @summary Create a new holeNmPrefix
   * @request POST:/api/v1/hole-nm-prefix
   * @secure
   */
  holeNmPrefixControllerCreate = (
    data: CreateHoleNmPrefixDto,
    params: RequestParams = {},
  ) =>
    this.request<HoleNmPrefix, void>({
      path: `/api/v1/hole-nm-prefix`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags holeNmPrefix
   * @name HoleNmPrefixControllerFindAll
   * @summary Get all holeNmPrefixs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/hole-nm-prefix
   * @secure
   */
  holeNmPrefixControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: HoleNmPrefix[];
      },
      any
    >({
      path: `/api/v1/hole-nm-prefix`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags holeNmPrefix
   * @name HoleNmPrefixControllerFindOne
   * @summary Get a holeNmPrefix by id
   * @request GET:/api/v1/hole-nm-prefix/{id}
   * @secure
   */
  holeNmPrefixControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<HoleNmPrefix, void>({
      path: `/api/v1/hole-nm-prefix/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags holeNmPrefix
   * @name HoleNmPrefixControllerUpdate
   * @summary Update a holeNmPrefix
   * @request PUT:/api/v1/hole-nm-prefix/{id}
   * @secure
   */
  holeNmPrefixControllerUpdate = (
    id: string,
    data: UpdateHoleNmPrefixDto,
    params: RequestParams = {},
  ) =>
    this.request<HoleNmPrefix, void>({
      path: `/api/v1/hole-nm-prefix/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags holeNmPrefix
   * @name HoleNmPrefixControllerRemove
   * @summary Delete a holeNmPrefix
   * @request DELETE:/api/v1/hole-nm-prefix/{id}
   * @secure
   */
  holeNmPrefixControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/hole-nm-prefix/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags organization
   * @name OrganizationControllerCreate
   * @summary Create a new organization
   * @request POST:/api/v1/organization
   * @secure
   */
  organizationControllerCreate = (
    data: CreateOrganizationDto,
    params: RequestParams = {},
  ) =>
    this.request<Organization, void>({
      path: `/api/v1/organization`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags organization
   * @name OrganizationControllerFindAll
   * @summary Get all organizations with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/organization
   * @secure
   */
  organizationControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Organization[];
      },
      any
    >({
      path: `/api/v1/organization`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags organization
   * @name OrganizationControllerFindOne
   * @summary Get a organization by id
   * @request GET:/api/v1/organization/{id}
   * @secure
   */
  organizationControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Organization, void>({
      path: `/api/v1/organization/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags organization
   * @name OrganizationControllerUpdate
   * @summary Update a organization
   * @request PUT:/api/v1/organization/{id}
   * @secure
   */
  organizationControllerUpdate = (
    id: string,
    data: UpdateOrganizationDto,
    params: RequestParams = {},
  ) =>
    this.request<Organization, void>({
      path: `/api/v1/organization/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags organization
   * @name OrganizationControllerRemove
   * @summary Delete a organization
   * @request DELETE:/api/v1/organization/{id}
   * @secure
   */
  organizationControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/organization/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags phase
   * @name PhaseControllerCreate
   * @summary Create a new phase
   * @request POST:/api/v1/phase
   * @secure
   */
  phaseControllerCreate = (data: CreatePhaseDto, params: RequestParams = {}) =>
    this.request<Phase, void>({
      path: `/api/v1/phase`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags phase
   * @name PhaseControllerFindAll
   * @summary Get all phases with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/phase
   * @secure
   */
  phaseControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Phase[];
      },
      any
    >({
      path: `/api/v1/phase`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags phase
   * @name PhaseControllerFindOne
   * @summary Get a phase by id
   * @request GET:/api/v1/phase/{id}
   * @secure
   */
  phaseControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Phase, void>({
      path: `/api/v1/phase/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags phase
   * @name PhaseControllerUpdate
   * @summary Update a phase
   * @request PUT:/api/v1/phase/{id}
   * @secure
   */
  phaseControllerUpdate = (
    id: string,
    data: UpdatePhaseDto,
    params: RequestParams = {},
  ) =>
    this.request<Phase, void>({
      path: `/api/v1/phase/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags phase
   * @name PhaseControllerRemove
   * @summary Delete a phase
   * @request DELETE:/api/v1/phase/{id}
   * @secure
   */
  phaseControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/phase/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags pit
   * @name PitControllerCreate
   * @summary Create a new pit
   * @request POST:/api/v1/pit
   * @secure
   */
  pitControllerCreate = (data: CreatePitDto, params: RequestParams = {}) =>
    this.request<Pit, void>({
      path: `/api/v1/pit`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pit
   * @name PitControllerFindAll
   * @summary Get all pits with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pit
   * @secure
   */
  pitControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Pit[];
      },
      any
    >({
      path: `/api/v1/pit`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pit
   * @name PitControllerFindOne
   * @summary Get a pit by id
   * @request GET:/api/v1/pit/{id}
   * @secure
   */
  pitControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Pit, void>({
      path: `/api/v1/pit/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pit
   * @name PitControllerUpdate
   * @summary Update a pit
   * @request PUT:/api/v1/pit/{id}
   * @secure
   */
  pitControllerUpdate = (
    id: string,
    data: UpdatePitDto,
    params: RequestParams = {},
  ) =>
    this.request<Pit, void>({
      path: `/api/v1/pit/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pit
   * @name PitControllerRemove
   * @summary Delete a pit
   * @request DELETE:/api/v1/pit/{id}
   * @secure
   */
  pitControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/pit/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags project
   * @name ProjectControllerCreate
   * @summary Create a new project
   * @request POST:/api/v1/project
   * @secure
   */
  projectControllerCreate = (
    data: CreateProjectDto,
    params: RequestParams = {},
  ) =>
    this.request<Project, void>({
      path: `/api/v1/project`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags project
   * @name ProjectControllerFindAll
   * @summary Get all projects with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/project
   * @secure
   */
  projectControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Project[];
      },
      any
    >({
      path: `/api/v1/project`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags project
   * @name ProjectControllerFindOne
   * @summary Get a project by id
   * @request GET:/api/v1/project/{id}
   * @secure
   */
  projectControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Project, void>({
      path: `/api/v1/project/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags project
   * @name ProjectControllerUpdate
   * @summary Update a project
   * @request PUT:/api/v1/project/{id}
   * @secure
   */
  projectControllerUpdate = (
    id: string,
    data: UpdateProjectDto,
    params: RequestParams = {},
  ) =>
    this.request<Project, void>({
      path: `/api/v1/project/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags project
   * @name ProjectControllerRemove
   * @summary Delete a project
   * @request DELETE:/api/v1/project/{id}
   * @secure
   */
  projectControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/project/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags prospect
   * @name ProspectControllerCreate
   * @summary Create a new prospect
   * @request POST:/api/v1/prospect
   * @secure
   */
  prospectControllerCreate = (
    data: CreateProspectDto,
    params: RequestParams = {},
  ) =>
    this.request<Prospect, void>({
      path: `/api/v1/prospect`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags prospect
   * @name ProspectControllerFindAll
   * @summary Get all prospects with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/prospect
   * @secure
   */
  prospectControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Prospect[];
      },
      any
    >({
      path: `/api/v1/prospect`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags prospect
   * @name ProspectControllerFindOne
   * @summary Get a prospect by id
   * @request GET:/api/v1/prospect/{id}
   * @secure
   */
  prospectControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Prospect, void>({
      path: `/api/v1/prospect/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags prospect
   * @name ProspectControllerUpdate
   * @summary Update a prospect
   * @request PUT:/api/v1/prospect/{id}
   * @secure
   */
  prospectControllerUpdate = (
    id: string,
    data: UpdateProspectDto,
    params: RequestParams = {},
  ) =>
    this.request<Prospect, void>({
      path: `/api/v1/prospect/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags prospect
   * @name ProspectControllerRemove
   * @summary Delete a prospect
   * @request DELETE:/api/v1/prospect/{id}
   * @secure
   */
  prospectControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/prospect/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags section
   * @name SectionControllerCreate
   * @summary Create a new section
   * @request POST:/api/v1/section
   * @secure
   */
  sectionControllerCreate = (
    data: CreateSectionDto,
    params: RequestParams = {},
  ) =>
    this.request<Section, void>({
      path: `/api/v1/section`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags section
   * @name SectionControllerFindAll
   * @summary Get all sections with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/section
   * @secure
   */
  sectionControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Section[];
      },
      any
    >({
      path: `/api/v1/section`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags section
   * @name SectionControllerFindOne
   * @summary Get a section by id
   * @request GET:/api/v1/section/{id}
   * @secure
   */
  sectionControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Section, void>({
      path: `/api/v1/section/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags section
   * @name SectionControllerUpdate
   * @summary Update a section
   * @request PUT:/api/v1/section/{id}
   * @secure
   */
  sectionControllerUpdate = (
    id: string,
    data: UpdateSectionDto,
    params: RequestParams = {},
  ) =>
    this.request<Section, void>({
      path: `/api/v1/section/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags section
   * @name SectionControllerRemove
   * @summary Delete a section
   * @request DELETE:/api/v1/section/{id}
   * @secure
   */
  sectionControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/section/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags subTarget
   * @name SubTargetControllerCreate
   * @summary Create a new subTarget
   * @request POST:/api/v1/sub-target
   * @secure
   */
  subTargetControllerCreate = (
    data: CreateSubTargetDto,
    params: RequestParams = {},
  ) =>
    this.request<SubTarget, void>({
      path: `/api/v1/sub-target`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags subTarget
   * @name SubTargetControllerFindAll
   * @summary Get all subTargets with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sub-target
   * @secure
   */
  subTargetControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: SubTarget[];
      },
      any
    >({
      path: `/api/v1/sub-target`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags subTarget
   * @name SubTargetControllerFindOne
   * @summary Get a subTarget by id
   * @request GET:/api/v1/sub-target/{id}
   * @secure
   */
  subTargetControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<SubTarget, void>({
      path: `/api/v1/sub-target/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags subTarget
   * @name SubTargetControllerUpdate
   * @summary Update a subTarget
   * @request PUT:/api/v1/sub-target/{id}
   * @secure
   */
  subTargetControllerUpdate = (
    id: string,
    data: UpdateSubTargetDto,
    params: RequestParams = {},
  ) =>
    this.request<SubTarget, void>({
      path: `/api/v1/sub-target/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags subTarget
   * @name SubTargetControllerRemove
   * @summary Delete a subTarget
   * @request DELETE:/api/v1/sub-target/{id}
   * @secure
   */
  subTargetControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/sub-target/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags target
   * @name TargetControllerCreate
   * @summary Create a new target
   * @request POST:/api/v1/target
   * @secure
   */
  targetControllerCreate = (
    data: CreateTargetDto,
    params: RequestParams = {},
  ) =>
    this.request<Target, void>({
      path: `/api/v1/target`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags target
   * @name TargetControllerFindAll
   * @summary Get all targets with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/target
   * @secure
   */
  targetControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Target[];
      },
      any
    >({
      path: `/api/v1/target`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags target
   * @name TargetControllerFindOne
   * @summary Get a target by id
   * @request GET:/api/v1/target/{id}
   * @secure
   */
  targetControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Target, void>({
      path: `/api/v1/target/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags target
   * @name TargetControllerUpdate
   * @summary Update a target
   * @request PUT:/api/v1/target/{id}
   * @secure
   */
  targetControllerUpdate = (
    id: string,
    data: UpdateTargetDto,
    params: RequestParams = {},
  ) =>
    this.request<Target, void>({
      path: `/api/v1/target/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags target
   * @name TargetControllerRemove
   * @summary Delete a target
   * @request DELETE:/api/v1/target/{id}
   * @secure
   */
  targetControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/target/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags tenement
   * @name TenementControllerCreate
   * @summary Create a new tenement
   * @request POST:/api/v1/tenement
   * @secure
   */
  tenementControllerCreate = (
    data: CreateTenementDto,
    params: RequestParams = {},
  ) =>
    this.request<Tenement, void>({
      path: `/api/v1/tenement`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags tenement
   * @name TenementControllerFindAll
   * @summary Get all tenements with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/tenement
   * @secure
   */
  tenementControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Tenement[];
      },
      any
    >({
      path: `/api/v1/tenement`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags tenement
   * @name TenementControllerFindOne
   * @summary Get a tenement by id
   * @request GET:/api/v1/tenement/{id}
   * @secure
   */
  tenementControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Tenement, void>({
      path: `/api/v1/tenement/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags tenement
   * @name TenementControllerUpdate
   * @summary Update a tenement
   * @request PUT:/api/v1/tenement/{id}
   * @secure
   */
  tenementControllerUpdate = (
    id: string,
    data: UpdateTenementDto,
    params: RequestParams = {},
  ) =>
    this.request<Tenement, void>({
      path: `/api/v1/tenement/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags tenement
   * @name TenementControllerRemove
   * @summary Delete a tenement
   * @request DELETE:/api/v1/tenement/{id}
   * @secure
   */
  tenementControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/tenement/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags zone
   * @name ZoneControllerCreate
   * @summary Create a new zone
   * @request POST:/api/v1/zone
   * @secure
   */
  zoneControllerCreate = (data: CreateZoneDto, params: RequestParams = {}) =>
    this.request<Zone, void>({
      path: `/api/v1/zone`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags zone
   * @name ZoneControllerFindAll
   * @summary Get all zones with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/zone
   * @secure
   */
  zoneControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Zone[];
      },
      any
    >({
      path: `/api/v1/zone`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags zone
   * @name ZoneControllerFindOne
   * @summary Get a zone by id
   * @request GET:/api/v1/zone/{id}
   * @secure
   */
  zoneControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Zone, void>({
      path: `/api/v1/zone/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags zone
   * @name ZoneControllerUpdate
   * @summary Update a zone
   * @request PUT:/api/v1/zone/{id}
   * @secure
   */
  zoneControllerUpdate = (
    id: string,
    data: UpdateZoneDto,
    params: RequestParams = {},
  ) =>
    this.request<Zone, void>({
      path: `/api/v1/zone/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags zone
   * @name ZoneControllerRemove
   * @summary Delete a zone
   * @request DELETE:/api/v1/zone/{id}
   * @secure
   */
  zoneControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/zone/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags collar
   * @name CollarControllerCreate
   * @summary Create a new collar
   * @request POST:/api/v1/collar
   * @secure
   */
  collarControllerCreate = (
    data: CreateCollarDto,
    params: RequestParams = {},
  ) =>
    this.request<Collar, void>({
      path: `/api/v1/collar`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags collar
   * @name CollarControllerFindAll
   * @summary Get all collars with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/collar
   * @secure
   */
  collarControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Collar[];
      },
      any
    >({
      path: `/api/v1/collar`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags collar
   * @name CollarControllerFindOne
   * @summary Get a collar by id
   * @request GET:/api/v1/collar/{id}
   * @secure
   */
  collarControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Collar, void>({
      path: `/api/v1/collar/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags collar
   * @name CollarControllerUpdate
   * @summary Update a collar
   * @request PUT:/api/v1/collar/{id}
   * @secure
   */
  collarControllerUpdate = (
    id: string,
    data: UpdateCollarDto,
    params: RequestParams = {},
  ) =>
    this.request<Collar, void>({
      path: `/api/v1/collar/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags collar
   * @name CollarControllerRemove
   * @summary Delete a collar
   * @request DELETE:/api/v1/collar/{id}
   * @secure
   */
  collarControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/collar/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags collar
   * @name CollarControllerUpsert
   * @summary Upsert Collar with LoggingEvent handling
   * @request POST:/api/v1/collar/upsert
   * @secure
   */
  collarControllerUpsert = (
    data: UpsertCollarDto,
    params: RequestParams = {},
  ) =>
    this.request<Collar, void>({
      path: `/api/v1/collar/upsert`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Updates audit/action columns (RowStatus, ValidationStatus, ReportIncludeInd, ActiveInd, ValidationErrors) for all records in a specified section that belong to this drill hole. **Returns the actual updated section records**, not the Collar entity. Supports sections like: Sample, SurveyLog, GeologyCombinedLog, DrillMethod, RigSetup, and 25+ more. The update is performed in a transaction and audit fields (ModifiedBy, ModifiedOnDt) are automatically populated. **Example:** - PATCH /collar/A60FE3BC-AFF4-4D7D-9C29-0003DAD75E1B/section/sample/status - Body: { "RowStatus": 2, "ValidationStatus": 1, "ActiveInd": true } - Returns: Array of updated Sample records
   *
   * @tags collar
   * @name CollarControllerUpdateSectionStatus
   * @summary Update status fields for section records
   * @request PATCH:/api/v1/collar/{id}/section/{sectionKey}/status
   * @secure
   */
  collarControllerUpdateSectionStatus = (
    id: string,
    sectionKey: string,
    data: UpdateSectionStatusDto,
    params: RequestParams = {},
  ) =>
    this.request<object[], void>({
      path: `/api/v1/collar/${id}/section/${sectionKey}/status`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags loggingEvent
   * @name LoggingEventControllerCreate
   * @summary Create a new loggingEvent
   * @request POST:/api/v1/logging-event
   * @secure
   */
  loggingEventControllerCreate = (
    data: CreateLoggingEventDto,
    params: RequestParams = {},
  ) =>
    this.request<LoggingEvent, void>({
      path: `/api/v1/logging-event`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags loggingEvent
   * @name LoggingEventControllerFindAll
   * @summary Get all loggingEvents with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/logging-event
   * @secure
   */
  loggingEventControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: LoggingEvent[];
      },
      any
    >({
      path: `/api/v1/logging-event`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags loggingEvent
   * @name LoggingEventControllerFindOne
   * @summary Get a loggingEvent by id
   * @request GET:/api/v1/logging-event/{id}
   * @secure
   */
  loggingEventControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<LoggingEvent, void>({
      path: `/api/v1/logging-event/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags loggingEvent
   * @name LoggingEventControllerUpdate
   * @summary Update a loggingEvent
   * @request PUT:/api/v1/logging-event/{id}
   * @secure
   */
  loggingEventControllerUpdate = (
    id: string,
    data: UpdateLoggingEventDto,
    params: RequestParams = {},
  ) =>
    this.request<LoggingEvent, void>({
      path: `/api/v1/logging-event/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags loggingEvent
   * @name LoggingEventControllerRemove
   * @summary Delete a loggingEvent
   * @request DELETE:/api/v1/logging-event/{id}
   * @secure
   */
  loggingEventControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/logging-event/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags collarCoordinate
   * @name CollarCoordinateControllerCreate
   * @summary Create a new collarCoordinate
   * @request POST:/api/v1/collar-coordinate
   * @secure
   */
  collarCoordinateControllerCreate = (
    data: CreateCollarCoordinateDto,
    params: RequestParams = {},
  ) =>
    this.request<CollarCoordinate, void>({
      path: `/api/v1/collar-coordinate`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags collarCoordinate
   * @name CollarCoordinateControllerFindAll
   * @summary Get all collarCoordinates with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/collar-coordinate
   * @secure
   */
  collarCoordinateControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: CollarCoordinate[];
      },
      any
    >({
      path: `/api/v1/collar-coordinate`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags collarCoordinate
   * @name CollarCoordinateControllerFindOne
   * @summary Get a collarCoordinate by id
   * @request GET:/api/v1/collar-coordinate/{id}
   * @secure
   */
  collarCoordinateControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<CollarCoordinate, void>({
      path: `/api/v1/collar-coordinate/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags collarHistory
   * @name CollarHistoryControllerCreate
   * @summary Create a new collarHistory
   * @request POST:/api/v1/collar-history
   * @secure
   */
  collarHistoryControllerCreate = (
    data: CreateCollarHistoryDto,
    params: RequestParams = {},
  ) =>
    this.request<CollarHistory, void>({
      path: `/api/v1/collar-history`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags collarHistory
   * @name CollarHistoryControllerFindAll
   * @summary Get all collarHistorys with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/collar-history
   * @secure
   */
  collarHistoryControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: CollarHistory[];
      },
      any
    >({
      path: `/api/v1/collar-history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags collarHistory
   * @name CollarHistoryControllerFindOne
   * @summary Get a collarHistory by id
   * @request GET:/api/v1/collar-history/{id}
   * @secure
   */
  collarHistoryControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<CollarHistory, void>({
      path: `/api/v1/collar-history/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags collarHistory
   * @name CollarHistoryControllerUpdate
   * @summary Update a collarHistory
   * @request PUT:/api/v1/collar-history/{id}
   * @secure
   */
  collarHistoryControllerUpdate = (
    id: string,
    data: UpdateCollarHistoryDto,
    params: RequestParams = {},
  ) =>
    this.request<CollarHistory, void>({
      path: `/api/v1/collar-history/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags collarHistory
   * @name CollarHistoryControllerRemove
   * @summary Delete a collarHistory
   * @request DELETE:/api/v1/collar-history/{id}
   * @secure
   */
  collarHistoryControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/collar-history/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags comment
   * @name CommentControllerCreate
   * @summary Create a new comment
   * @request POST:/api/v1/comment
   * @secure
   */
  commentControllerCreate = (
    data: CreateCommentDto,
    params: RequestParams = {},
  ) =>
    this.request<Comment, void>({
      path: `/api/v1/comment`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags comment
   * @name CommentControllerFindAll
   * @summary Get all comments with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/comment
   * @secure
   */
  commentControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Comment[];
      },
      any
    >({
      path: `/api/v1/comment`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags comment
   * @name CommentControllerFindOne
   * @summary Get a comment by id
   * @request GET:/api/v1/comment/{id}
   * @secure
   */
  commentControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Comment, void>({
      path: `/api/v1/comment/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags comment
   * @name CommentControllerUpdate
   * @summary Update a comment
   * @request PUT:/api/v1/comment/{id}
   * @secure
   */
  commentControllerUpdate = (
    id: string,
    data: UpdateCommentDto,
    params: RequestParams = {},
  ) =>
    this.request<Comment, void>({
      path: `/api/v1/comment/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags comment
   * @name CommentControllerRemove
   * @summary Delete a comment
   * @request DELETE:/api/v1/comment/{id}
   * @secure
   */
  commentControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/comment/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags cycloneCleaning
   * @name CycloneCleaningControllerCreate
   * @summary Create a new cycloneCleaning
   * @request POST:/api/v1/cyclone-cleaning
   * @secure
   */
  cycloneCleaningControllerCreate = (
    data: CreateCycloneCleaningDto,
    params: RequestParams = {},
  ) =>
    this.request<CycloneCleaning, void>({
      path: `/api/v1/cyclone-cleaning`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags cycloneCleaning
   * @name CycloneCleaningControllerFindAll
   * @summary Get all cycloneCleanings with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/cyclone-cleaning
   * @secure
   */
  cycloneCleaningControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: CycloneCleaning[];
      },
      any
    >({
      path: `/api/v1/cyclone-cleaning`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags cycloneCleaning
   * @name CycloneCleaningControllerFindOne
   * @summary Get a cycloneCleaning by id
   * @request GET:/api/v1/cyclone-cleaning/{id}
   * @secure
   */
  cycloneCleaningControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<CycloneCleaning, void>({
      path: `/api/v1/cyclone-cleaning/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags cycloneCleaning
   * @name CycloneCleaningControllerUpdate
   * @summary Update a cycloneCleaning
   * @request PUT:/api/v1/cyclone-cleaning/{id}
   * @secure
   */
  cycloneCleaningControllerUpdate = (
    id: string,
    data: UpdateCycloneCleaningDto,
    params: RequestParams = {},
  ) =>
    this.request<CycloneCleaning, void>({
      path: `/api/v1/cyclone-cleaning/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags cycloneCleaning
   * @name CycloneCleaningControllerRemove
   * @summary Delete a cycloneCleaning
   * @request DELETE:/api/v1/cyclone-cleaning/{id}
   * @secure
   */
  cycloneCleaningControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/cyclone-cleaning/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags drillMethod
   * @name DrillMethodControllerCreate
   * @summary Create a new drillMethod
   * @request POST:/api/v1/drill-method
   * @secure
   */
  drillMethodControllerCreate = (
    data: CreateDrillMethodDto,
    params: RequestParams = {},
  ) =>
    this.request<DrillMethod, void>({
      path: `/api/v1/drill-method`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillMethod
   * @name DrillMethodControllerFindAll
   * @summary Get all drillMethods with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/drill-method
   * @secure
   */
  drillMethodControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: DrillMethod[];
      },
      any
    >({
      path: `/api/v1/drill-method`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillMethod
   * @name DrillMethodControllerFindOne
   * @summary Get a drillMethod by id
   * @request GET:/api/v1/drill-method/{id}
   * @secure
   */
  drillMethodControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<DrillMethod, void>({
      path: `/api/v1/drill-method/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillMethod
   * @name DrillMethodControllerUpdate
   * @summary Update a drillMethod
   * @request PUT:/api/v1/drill-method/{id}
   * @secure
   */
  drillMethodControllerUpdate = (
    id: string,
    data: UpdateDrillMethodDto,
    params: RequestParams = {},
  ) =>
    this.request<DrillMethod, void>({
      path: `/api/v1/drill-method/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillMethod
   * @name DrillMethodControllerRemove
   * @summary Delete a drillMethod
   * @request DELETE:/api/v1/drill-method/{id}
   * @secure
   */
  drillMethodControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/drill-method/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags drillMethod
   * @name DrillMethodControllerBulkUpsert
   * @summary Bulk upsert DrillMethod records without LoggingEvent
   * @request POST:/api/v1/drill-method/bulk-upsert
   * @secure
   */
  drillMethodControllerBulkUpsert = (
    data: DrillMethodBase[],
    params: RequestParams = {},
  ) =>
    this.request<DrillMethod[], void>({
      path: `/api/v1/drill-method/bulk-upsert`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags hole
   * @name HoleControllerCreate
   * @summary Create a new hole
   * @request POST:/api/v1/hole
   * @secure
   */
  holeControllerCreate = (data: CreateHoleDto, params: RequestParams = {}) =>
    this.request<Hole, void>({
      path: `/api/v1/hole`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags hole
   * @name HoleControllerFindAll
   * @summary Get all holes with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/hole
   * @secure
   */
  holeControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Hole[];
      },
      any
    >({
      path: `/api/v1/hole`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags hole
   * @name HoleControllerFindOne
   * @summary Get a hole by id
   * @request GET:/api/v1/hole/{id}
   * @secure
   */
  holeControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Hole, void>({
      path: `/api/v1/hole/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags hole
   * @name HoleControllerUpdate
   * @summary Update a hole
   * @request PUT:/api/v1/hole/{id}
   * @secure
   */
  holeControllerUpdate = (
    id: string,
    data: UpdateHoleDto,
    params: RequestParams = {},
  ) =>
    this.request<Hole, void>({
      path: `/api/v1/hole/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags hole
   * @name HoleControllerRemove
   * @summary Delete a hole
   * @request DELETE:/api/v1/hole/{id}
   * @secure
   */
  holeControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/hole/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags holeName
   * @name HoleNameControllerCreate
   * @summary Create a new holeName
   * @request POST:/api/v1/hole-name
   * @secure
   */
  holeNameControllerCreate = (
    data: CreateHoleNameDto,
    params: RequestParams = {},
  ) =>
    this.request<HoleName, void>({
      path: `/api/v1/hole-name`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags holeName
   * @name HoleNameControllerFindAll
   * @summary Get all holeNames with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/hole-name
   * @secure
   */
  holeNameControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: HoleName[];
      },
      any
    >({
      path: `/api/v1/hole-name`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags holeName
   * @name HoleNameControllerFindOne
   * @summary Get a holeName by id
   * @request GET:/api/v1/hole-name/{id}
   * @secure
   */
  holeNameControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<HoleName, void>({
      path: `/api/v1/hole-name/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags holeName
   * @name HoleNameControllerUpdate
   * @summary Update a holeName
   * @request PUT:/api/v1/hole-name/{id}
   * @secure
   */
  holeNameControllerUpdate = (
    id: string,
    data: UpdateHoleNameDto,
    params: RequestParams = {},
  ) =>
    this.request<HoleName, void>({
      path: `/api/v1/hole-name/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags holeName
   * @name HoleNameControllerRemove
   * @summary Delete a holeName
   * @request DELETE:/api/v1/hole-name/{id}
   * @secure
   */
  holeNameControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/hole-name/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags metaDataLog
   * @name MetaDataLogControllerCreate
   * @summary Create a new metaDataLog
   * @request POST:/api/v1/meta-data-log
   * @secure
   */
  metaDataLogControllerCreate = (
    data: CreateMetaDataLogDto,
    params: RequestParams = {},
  ) =>
    this.request<MetaDataLog, void>({
      path: `/api/v1/meta-data-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags metaDataLog
   * @name MetaDataLogControllerFindAll
   * @summary Get all metaDataLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/meta-data-log
   * @secure
   */
  metaDataLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: MetaDataLog[];
      },
      any
    >({
      path: `/api/v1/meta-data-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags metaDataLog
   * @name MetaDataLogControllerFindOne
   * @summary Get a metaDataLog by id
   * @request GET:/api/v1/meta-data-log/{id}
   * @secure
   */
  metaDataLogControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<MetaDataLog, void>({
      path: `/api/v1/meta-data-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags metaDataLog
   * @name MetaDataLogControllerUpdate
   * @summary Update a metaDataLog
   * @request PUT:/api/v1/meta-data-log/{id}
   * @secure
   */
  metaDataLogControllerUpdate = (
    id: string,
    data: UpdateMetaDataLogDto,
    params: RequestParams = {},
  ) =>
    this.request<MetaDataLog, void>({
      path: `/api/v1/meta-data-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags metaDataLog
   * @name MetaDataLogControllerRemove
   * @summary Delete a metaDataLog
   * @request DELETE:/api/v1/meta-data-log/{id}
   * @secure
   */
  metaDataLogControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/meta-data-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags rigSetup
   * @name RigSetupControllerCreate
   * @summary Create a new rigSetup
   * @request POST:/api/v1/rig-setup
   * @secure
   */
  rigSetupControllerCreate = (
    data: CreateRigSetupDto,
    params: RequestParams = {},
  ) =>
    this.request<RigSetup, void>({
      path: `/api/v1/rig-setup`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags rigSetup
   * @name RigSetupControllerFindAll
   * @summary Get all rigSetups with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/rig-setup
   * @secure
   */
  rigSetupControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: RigSetup[];
      },
      any
    >({
      path: `/api/v1/rig-setup`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags rigSetup
   * @name RigSetupControllerFindOne
   * @summary Get a rigSetup by id
   * @request GET:/api/v1/rig-setup/{id}
   * @secure
   */
  rigSetupControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<RigSetup, void>({
      path: `/api/v1/rig-setup/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags rigSetup
   * @name RigSetupControllerUpdate
   * @summary Update a rigSetup
   * @request PUT:/api/v1/rig-setup/{id}
   * @secure
   */
  rigSetupControllerUpdate = (
    id: string,
    data: UpdateRigSetupDto,
    params: RequestParams = {},
  ) =>
    this.request<RigSetup, void>({
      path: `/api/v1/rig-setup/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags rigSetup
   * @name RigSetupControllerRemove
   * @summary Delete a rigSetup
   * @request DELETE:/api/v1/rig-setup/{id}
   * @secure
   */
  rigSetupControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/rig-setup/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags sectionVersion
   * @name SectionVersionControllerCreate
   * @summary Create a new sectionVersion
   * @request POST:/api/v1/section-version
   * @secure
   */
  sectionVersionControllerCreate = (
    data: CreateSectionVersionDto,
    params: RequestParams = {},
  ) =>
    this.request<SectionVersion, void>({
      path: `/api/v1/section-version`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sectionVersion
   * @name SectionVersionControllerFindAll
   * @summary Get all sectionVersions with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/section-version
   * @secure
   */
  sectionVersionControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: SectionVersion[];
      },
      any
    >({
      path: `/api/v1/section-version`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sectionVersion
   * @name SectionVersionControllerFindOne
   * @summary Get a sectionVersion by id
   * @request GET:/api/v1/section-version/{id}
   * @secure
   */
  sectionVersionControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<SectionVersion, void>({
      path: `/api/v1/section-version/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sectionVersion
   * @name SectionVersionControllerUpdate
   * @summary Update a sectionVersion
   * @request PUT:/api/v1/section-version/{id}
   * @secure
   */
  sectionVersionControllerUpdate = (
    id: string,
    data: UpdateSectionVersionDto,
    params: RequestParams = {},
  ) =>
    this.request<SectionVersion, void>({
      path: `/api/v1/section-version/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sectionVersion
   * @name SectionVersionControllerRemove
   * @summary Delete a sectionVersion
   * @request DELETE:/api/v1/section-version/{id}
   * @secure
   */
  sectionVersionControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/section-version/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags survey
   * @name SurveyControllerCreate
   * @summary Create a new survey
   * @request POST:/api/v1/survey
   * @secure
   */
  surveyControllerCreate = (
    data: CreateSurveyDto,
    params: RequestParams = {},
  ) =>
    this.request<Survey, void>({
      path: `/api/v1/survey`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags survey
   * @name SurveyControllerFindAll
   * @summary Get all surveys with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/survey
   * @secure
   */
  surveyControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Survey[];
      },
      any
    >({
      path: `/api/v1/survey`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags survey
   * @name SurveyControllerFindOne
   * @summary Get a survey by id
   * @request GET:/api/v1/survey/{id}
   * @secure
   */
  surveyControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Survey, void>({
      path: `/api/v1/survey/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags survey
   * @name SurveyControllerUpdate
   * @summary Update a survey
   * @request PUT:/api/v1/survey/{id}
   * @secure
   */
  surveyControllerUpdate = (
    id: string,
    data: UpdateSurveyDto,
    params: RequestParams = {},
  ) =>
    this.request<Survey, void>({
      path: `/api/v1/survey/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags survey
   * @name SurveyControllerRemove
   * @summary Delete a survey
   * @request DELETE:/api/v1/survey/{id}
   * @secure
   */
  surveyControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/survey/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags surveyLog
   * @name SurveyLogControllerCreate
   * @summary Create a new surveyLog
   * @request POST:/api/v1/survey-log
   * @secure
   */
  surveyLogControllerCreate = (
    data: CreateSurveyLogDto,
    params: RequestParams = {},
  ) =>
    this.request<SurveyLog, void>({
      path: `/api/v1/survey-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags surveyLog
   * @name SurveyLogControllerFindAll
   * @summary Get all surveyLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/survey-log
   * @secure
   */
  surveyLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: SurveyLog[];
      },
      any
    >({
      path: `/api/v1/survey-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags surveyLog
   * @name SurveyLogControllerFindOne
   * @summary Get a surveyLog by id
   * @request GET:/api/v1/survey-log/{id}
   * @secure
   */
  surveyLogControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<SurveyLog, void>({
      path: `/api/v1/survey-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags surveyLog
   * @name SurveyLogControllerUpdate
   * @summary Update a surveyLog
   * @request PUT:/api/v1/survey-log/{id}
   * @secure
   */
  surveyLogControllerUpdate = (
    id: string,
    data: UpdateSurveyLogDto,
    params: RequestParams = {},
  ) =>
    this.request<SurveyLog, void>({
      path: `/api/v1/survey-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags surveyLog
   * @name SurveyLogControllerRemove
   * @summary Delete a surveyLog
   * @request DELETE:/api/v1/survey-log/{id}
   * @secure
   */
  surveyLogControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/survey-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags surveyLog
   * @name SurveyLogControllerBulkUpsert
   * @summary Bulk upsert survey logs with chunking and transaction management
   * @request POST:/api/v1/survey-log/bulk-upsert
   * @secure
   */
  surveyLogControllerBulkUpsert = (
    data: UpsertSurveyLogDto,
    params: RequestParams = {},
  ) =>
    this.request<SurveyLog[], void>({
      path: `/api/v1/survey-log/bulk-upsert`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags surveyLog
   * @name SurveyLogControllerFindAllAuditLogs
   * @summary Get all survey log audit logs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/survey-log/audit-logs
   * @secure
   */
  surveyLogControllerFindAllAuditLogs = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: SurveyLog[];
      },
      any
    >({
      path: `/api/v1/survey-log/audit-logs`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags surveyLog
   * @name SurveyLogControllerFindOneAuditLog
   * @summary Get a survey log audit log by id
   * @request GET:/api/v1/survey-log/audit-logs/{id}
   * @secure
   */
  surveyLogControllerFindOneAuditLog = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<SurveyLog, void>({
      path: `/api/v1/survey-log/audit-logs/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags validationError
   * @name ValidationErrorControllerCreate
   * @summary Create a new validationError
   * @request POST:/api/v1/validation-error
   * @secure
   */
  validationErrorControllerCreate = (
    data: CreateValidationErrorDto,
    params: RequestParams = {},
  ) =>
    this.request<ValidationError, void>({
      path: `/api/v1/validation-error`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags validationError
   * @name ValidationErrorControllerFindAll
   * @summary Get all validationErrors with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/validation-error
   * @secure
   */
  validationErrorControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: ValidationError[];
      },
      any
    >({
      path: `/api/v1/validation-error`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags validationError
   * @name ValidationErrorControllerFindOne
   * @summary Get a validationError by id
   * @request GET:/api/v1/validation-error/{id}
   * @secure
   */
  validationErrorControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<ValidationError, void>({
      path: `/api/v1/validation-error/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags validationError
   * @name ValidationErrorControllerUpdate
   * @summary Update a validationError
   * @request PUT:/api/v1/validation-error/{id}
   * @secure
   */
  validationErrorControllerUpdate = (
    id: string,
    data: UpdateValidationErrorDto,
    params: RequestParams = {},
  ) =>
    this.request<ValidationError, void>({
      path: `/api/v1/validation-error/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags validationError
   * @name ValidationErrorControllerRemove
   * @summary Delete a validationError
   * @request DELETE:/api/v1/validation-error/{id}
   * @secure
   */
  validationErrorControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/validation-error/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPattern
   * @name DrillPatternControllerCreate
   * @summary Create a new drillPattern
   * @request POST:/api/v1/drill-pattern
   * @secure
   */
  drillPatternControllerCreate = (
    data: CreateDrillPatternDto,
    params: RequestParams = {},
  ) =>
    this.request<DrillPattern, void>({
      path: `/api/v1/drill-pattern`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPattern
   * @name DrillPatternControllerFindAll
   * @summary Get all drillPatterns with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/drill-pattern
   * @secure
   */
  drillPatternControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: DrillPattern[];
      },
      any
    >({
      path: `/api/v1/drill-pattern`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPattern
   * @name DrillPatternControllerFindOne
   * @summary Get a drillPattern by id
   * @request GET:/api/v1/drill-pattern/{id}
   * @secure
   */
  drillPatternControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<DrillPattern, void>({
      path: `/api/v1/drill-pattern/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPattern
   * @name DrillPatternControllerUpdate
   * @summary Update a drillPattern
   * @request PUT:/api/v1/drill-pattern/{id}
   * @secure
   */
  drillPatternControllerUpdate = (
    id: string,
    data: UpdateDrillPatternDto,
    params: RequestParams = {},
  ) =>
    this.request<DrillPattern, void>({
      path: `/api/v1/drill-pattern/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPattern
   * @name DrillPatternControllerRemove
   * @summary Delete a drillPattern
   * @request DELETE:/api/v1/drill-pattern/{id}
   * @secure
   */
  drillPatternControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/drill-pattern/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPlan
   * @name DrillPlanControllerCreate
   * @summary Create a new drillPlan
   * @request POST:/api/v1/drill-plan
   * @secure
   */
  drillPlanControllerCreate = (
    data: CreateDrillPlanDto,
    params: RequestParams = {},
  ) =>
    this.request<UiDrillPlanBase, void>({
      path: `/api/v1/drill-plan`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPlan
   * @name DrillPlanControllerFindAll
   * @summary Get all drillPlans with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/drill-plan
   * @secure
   */
  drillPlanControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: DrillPlan[];
      },
      any
    >({
      path: `/api/v1/drill-plan`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPlan
   * @name DrillPlanControllerUpsert
   * @summary Create a new drillPlan
   * @request POST:/api/v1/drill-plan/upsert
   * @secure
   */
  drillPlanControllerUpsert = (data: UiDrillPlan, params: RequestParams = {}) =>
    this.request<UiDrillPlanBase, void>({
      path: `/api/v1/drill-plan/upsert`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPlan
   * @name DrillPlanControllerFindOne
   * @summary Get a drillPlan by id
   * @request GET:/api/v1/drill-plan/{id}
   * @secure
   */
  drillPlanControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<UiDrillPlanBase, void>({
      path: `/api/v1/drill-plan/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPlan
   * @name DrillPlanControllerUpdate
   * @summary Update a drillPlan
   * @request PUT:/api/v1/drill-plan/{id}
   * @secure
   */
  drillPlanControllerUpdate = (
    id: string,
    data: UiDrillPlan,
    params: RequestParams = {},
  ) =>
    this.request<UiDrillPlanBase, void>({
      path: `/api/v1/drill-plan/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Validates state machine rules, permissions, and readiness checks before transitioning
   *
   * @tags drillPlan
   * @name DrillPlanControllerTransitionStatus
   * @summary Transition drill plan to a new status
   * @request POST:/api/v1/drill-plan/{id}/transition
   * @secure
   */
  drillPlanControllerTransitionStatus = (
    id: string,
    data: TransitionStatusDto,
    params: RequestParams = {},
  ) =>
    this.request<UiDrillPlan, void>({
      path: `/api/v1/drill-plan/${id}/transition`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Returns list of statuses the plan can transition to based on current status and user role
   *
   * @tags drillPlan
   * @name DrillPlanControllerGetAvailableTransitions
   * @summary Get available status transitions for a drill plan
   * @request GET:/api/v1/drill-plan/{id}/available-transitions
   * @secure
   */
  drillPlanControllerGetAvailableTransitions = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<AvailableTransitionsDto, void>({
      path: `/api/v1/drill-plan/${id}/available-transitions`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Validates if the drill plan meets all requirements for the target status
   *
   * @tags drillPlan
   * @name DrillPlanControllerCheckReadiness
   * @summary Check readiness for a specific status transition
   * @request GET:/api/v1/drill-plan/{id}/readiness/{toStatus}
   * @secure
   */
  drillPlanControllerCheckReadiness = (
    id: string,
    toStatus: string,
    params: RequestParams = {},
  ) =>
    this.request<ReadinessCheckResultDto, void>({
      path: `/api/v1/drill-plan/${id}/readiness/${toStatus}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns chronological list of all status changes with metadata
   *
   * @tags drillPlan
   * @name DrillPlanControllerGetStatusHistory
   * @summary Get status transition history for a drill plan
   * @request GET:/api/v1/drill-plan/{id}/status-history
   * @secure
   */
  drillPlanControllerGetStatusHistory = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<DrillPlanStatusHistoryBase[], void>({
      path: `/api/v1/drill-plan/${id}/status-history`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPlanStatusHistory
   * @name DrillPlanStatusHistoryControllerCreate
   * @summary Create a new drillPlanStatusHistory
   * @request POST:/api/v1/drill-plan-status-history
   * @secure
   */
  drillPlanStatusHistoryControllerCreate = (
    data: CreateDrillPlanStatusHistoryDto,
    params: RequestParams = {},
  ) =>
    this.request<DrillPlanStatusHistory, void>({
      path: `/api/v1/drill-plan-status-history`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPlanStatusHistory
   * @name DrillPlanStatusHistoryControllerFindAll
   * @summary Get all drillPlanStatusHistorys with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/drill-plan-status-history
   * @secure
   */
  drillPlanStatusHistoryControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: DrillPlanStatusHistory[];
      },
      any
    >({
      path: `/api/v1/drill-plan-status-history`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPlanStatusHistory
   * @name DrillPlanStatusHistoryControllerFindOne
   * @summary Get a drillPlanStatusHistory by id
   * @request GET:/api/v1/drill-plan-status-history/{id}
   * @secure
   */
  drillPlanStatusHistoryControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<DrillPlanStatusHistory, void>({
      path: `/api/v1/drill-plan-status-history/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPlanStatusHistory
   * @name DrillPlanStatusHistoryControllerUpdate
   * @summary Update a drillPlanStatusHistory
   * @request PUT:/api/v1/drill-plan-status-history/{id}
   * @secure
   */
  drillPlanStatusHistoryControllerUpdate = (
    id: string,
    data: UpdateDrillPlanStatusHistoryDto,
    params: RequestParams = {},
  ) =>
    this.request<DrillPlanStatusHistory, void>({
      path: `/api/v1/drill-plan-status-history/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillPlanStatusHistory
   * @name DrillPlanStatusHistoryControllerRemove
   * @summary Delete a drillPlanStatusHistory
   * @request DELETE:/api/v1/drill-plan-status-history/{id}
   * @secure
   */
  drillPlanStatusHistoryControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/drill-plan-status-history/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags drillProgram
   * @name DrillProgramControllerCreate
   * @summary Create a new drillProgram
   * @request POST:/api/v1/drill-program
   * @secure
   */
  drillProgramControllerCreate = (
    data: CreateDrillProgramDto,
    params: RequestParams = {},
  ) =>
    this.request<DrillProgram, void>({
      path: `/api/v1/drill-program`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillProgram
   * @name DrillProgramControllerFindAll
   * @summary Get all drillPrograms with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/drill-program
   * @secure
   */
  drillProgramControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: DrillProgram[];
      },
      any
    >({
      path: `/api/v1/drill-program`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillProgram
   * @name DrillProgramControllerFindOne
   * @summary Get a drillProgram by id
   * @request GET:/api/v1/drill-program/{id}
   * @secure
   */
  drillProgramControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<DrillProgram, void>({
      path: `/api/v1/drill-program/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillProgram
   * @name DrillProgramControllerUpdate
   * @summary Update a drillProgram
   * @request PUT:/api/v1/drill-program/{id}
   * @secure
   */
  drillProgramControllerUpdate = (
    id: string,
    data: UpdateDrillProgramDto,
    params: RequestParams = {},
  ) =>
    this.request<DrillProgram, void>({
      path: `/api/v1/drill-program/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags drillProgram
   * @name DrillProgramControllerRemove
   * @summary Delete a drillProgram
   * @request DELETE:/api/v1/drill-program/{id}
   * @secure
   */
  drillProgramControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/drill-program/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags geologyCombinedLog
   * @name GeologyCombinedLogControllerCreate
   * @summary Create a new geologyCombinedLog
   * @request POST:/api/v1/geology-combined-log
   * @secure
   */
  geologyCombinedLogControllerCreate = (
    data: CreateGeologyCombinedLogDto,
    params: RequestParams = {},
  ) =>
    this.request<GeologyCombinedLog, void>({
      path: `/api/v1/geology-combined-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags geologyCombinedLog
   * @name GeologyCombinedLogControllerFindAll
   * @summary Get all geologyCombinedLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/geology-combined-log
   * @secure
   */
  geologyCombinedLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: GeologyCombinedLog[];
      },
      any
    >({
      path: `/api/v1/geology-combined-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags geologyCombinedLog
   * @name GeologyCombinedLogControllerFindOne
   * @summary Get a geologyCombinedLog by id
   * @request GET:/api/v1/geology-combined-log/{id}
   * @secure
   */
  geologyCombinedLogControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<GeologyCombinedLog, void>({
      path: `/api/v1/geology-combined-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags geologyCombinedLog
   * @name GeologyCombinedLogControllerUpdate
   * @summary Update a geologyCombinedLog
   * @request PUT:/api/v1/geology-combined-log/{id}
   * @secure
   */
  geologyCombinedLogControllerUpdate = (
    id: string,
    data: UpdateGeologyCombinedLogDto,
    params: RequestParams = {},
  ) =>
    this.request<GeologyCombinedLog, void>({
      path: `/api/v1/geology-combined-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags geologyCombinedLog
   * @name GeologyCombinedLogControllerRemove
   * @summary Delete a geologyCombinedLog
   * @request DELETE:/api/v1/geology-combined-log/{id}
   * @secure
   */
  geologyCombinedLogControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/geology-combined-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags geologyCombinedLog
   * @name GeologyCombinedLogControllerUpsert
   * @summary Upsert UiGeologyCombinedLogSheet with GeologyCombinedLog records (single record)
   * @request POST:/api/v1/geology-combined-log/upsert
   * @secure
   */
  geologyCombinedLogControllerUpsert = (
    data: UpsertGeologyCombinedLoggingDto,
    query?: {
      action?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<GeologyCombinedLog[], void>({
      path: `/api/v1/geology-combined-log/upsert`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags shearLog
   * @name ShearLogControllerCreate
   * @summary Create a new shearLog
   * @request POST:/api/v1/shear-log
   * @secure
   */
  shearLogControllerCreate = (
    data: CreateShearLogDto,
    params: RequestParams = {},
  ) =>
    this.request<ShearLog, void>({
      path: `/api/v1/shear-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags shearLog
   * @name ShearLogControllerFindAll
   * @summary Get all shearLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/shear-log
   * @secure
   */
  shearLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: ShearLog[];
      },
      any
    >({
      path: `/api/v1/shear-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags shearLog
   * @name ShearLogControllerFindOne
   * @summary Get a shearLog by id
   * @request GET:/api/v1/shear-log/{id}
   * @secure
   */
  shearLogControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<ShearLog, void>({
      path: `/api/v1/shear-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags shearLog
   * @name ShearLogControllerUpdate
   * @summary Update a shearLog
   * @request PUT:/api/v1/shear-log/{id}
   * @secure
   */
  shearLogControllerUpdate = (
    id: string,
    data: UpdateShearLogDto,
    params: RequestParams = {},
  ) =>
    this.request<ShearLog, void>({
      path: `/api/v1/shear-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags shearLog
   * @name ShearLogControllerRemove
   * @summary Delete a shearLog
   * @request DELETE:/api/v1/shear-log/{id}
   * @secure
   */
  shearLogControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/shear-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags structureLog
   * @name StructureLogControllerCreate
   * @summary Create a new structureLog
   * @request POST:/api/v1/structure-log
   * @secure
   */
  structureLogControllerCreate = (
    data: CreateStructureLogDto,
    params: RequestParams = {},
  ) =>
    this.request<StructureLog, void>({
      path: `/api/v1/structure-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags structureLog
   * @name StructureLogControllerFindAll
   * @summary Get all structureLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/structure-log
   * @secure
   */
  structureLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: StructureLog[];
      },
      any
    >({
      path: `/api/v1/structure-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags structureLog
   * @name StructureLogControllerFindOne
   * @summary Get a structureLog by id
   * @request GET:/api/v1/structure-log/{id}
   * @secure
   */
  structureLogControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<StructureLog, void>({
      path: `/api/v1/structure-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags structureLog
   * @name StructureLogControllerUpdate
   * @summary Update a structureLog
   * @request PUT:/api/v1/structure-log/{id}
   * @secure
   */
  structureLogControllerUpdate = (
    id: string,
    data: UpdateStructureLogDto,
    params: RequestParams = {},
  ) =>
    this.request<StructureLog, void>({
      path: `/api/v1/structure-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags structureLog
   * @name StructureLogControllerRemove
   * @summary Delete a structureLog
   * @request DELETE:/api/v1/structure-log/{id}
   * @secure
   */
  structureLogControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/structure-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags structurePtLog
   * @name StructurePtLogControllerCreate
   * @summary Create a new structurePtLog
   * @request POST:/api/v1/structure-pt-log
   * @secure
   */
  structurePtLogControllerCreate = (
    data: CreateStructurePtLogDto,
    params: RequestParams = {},
  ) =>
    this.request<StructurePtLog, void>({
      path: `/api/v1/structure-pt-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags structurePtLog
   * @name StructurePtLogControllerFindAll
   * @summary Get all structurePtLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/structure-pt-log
   * @secure
   */
  structurePtLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: StructurePtLog[];
      },
      any
    >({
      path: `/api/v1/structure-pt-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags structurePtLog
   * @name StructurePtLogControllerFindOne
   * @summary Get a structurePtLog by id
   * @request GET:/api/v1/structure-pt-log/{id}
   * @secure
   */
  structurePtLogControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<StructurePtLog, void>({
      path: `/api/v1/structure-pt-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags structurePtLog
   * @name StructurePtLogControllerUpdate
   * @summary Update a structurePtLog
   * @request PUT:/api/v1/structure-pt-log/{id}
   * @secure
   */
  structurePtLogControllerUpdate = (
    id: string,
    data: UpdateStructurePtLogDto,
    params: RequestParams = {},
  ) =>
    this.request<StructurePtLog, void>({
      path: `/api/v1/structure-pt-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags structurePtLog
   * @name StructurePtLogControllerRemove
   * @summary Delete a structurePtLog
   * @request DELETE:/api/v1/structure-pt-log/{id}
   * @secure
   */
  structurePtLogControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/structure-pt-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags coreRecoveryRunLog
   * @name CoreRecoveryRunLogControllerCreate
   * @summary Create a new coreRecoveryRunLog
   * @request POST:/api/v1/core-recovery-run-log
   * @secure
   */
  coreRecoveryRunLogControllerCreate = (
    data: CreateCoreRecoveryRunLogDto,
    params: RequestParams = {},
  ) =>
    this.request<CoreRecoveryRunLog, void>({
      path: `/api/v1/core-recovery-run-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags coreRecoveryRunLog
   * @name CoreRecoveryRunLogControllerFindAll
   * @summary Get all coreRecoveryRunLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/core-recovery-run-log
   * @secure
   */
  coreRecoveryRunLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: CoreRecoveryRunLog[];
      },
      any
    >({
      path: `/api/v1/core-recovery-run-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags coreRecoveryRunLog
   * @name CoreRecoveryRunLogControllerFindOne
   * @summary Get a coreRecoveryRunLog by id
   * @request GET:/api/v1/core-recovery-run-log/{id}
   * @secure
   */
  coreRecoveryRunLogControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<CoreRecoveryRunLog, void>({
      path: `/api/v1/core-recovery-run-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags coreRecoveryRunLog
   * @name CoreRecoveryRunLogControllerUpdate
   * @summary Update a coreRecoveryRunLog
   * @request PUT:/api/v1/core-recovery-run-log/{id}
   * @secure
   */
  coreRecoveryRunLogControllerUpdate = (
    id: string,
    data: UpdateCoreRecoveryRunLogDto,
    params: RequestParams = {},
  ) =>
    this.request<CoreRecoveryRunLog, void>({
      path: `/api/v1/core-recovery-run-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags coreRecoveryRunLog
   * @name CoreRecoveryRunLogControllerRemove
   * @summary Delete a coreRecoveryRunLog
   * @request DELETE:/api/v1/core-recovery-run-log/{id}
   * @secure
   */
  coreRecoveryRunLogControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/core-recovery-run-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags fractureCountLog
   * @name FractureCountLogControllerCreate
   * @summary Create a new fractureCountLog
   * @request POST:/api/v1/fracture-count-log
   * @secure
   */
  fractureCountLogControllerCreate = (
    data: CreateFractureCountLogDto,
    params: RequestParams = {},
  ) =>
    this.request<FractureCountLog, void>({
      path: `/api/v1/fracture-count-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags fractureCountLog
   * @name FractureCountLogControllerFindAll
   * @summary Get all fractureCountLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/fracture-count-log
   * @secure
   */
  fractureCountLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: FractureCountLog[];
      },
      any
    >({
      path: `/api/v1/fracture-count-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags fractureCountLog
   * @name FractureCountLogControllerFindOne
   * @summary Get a fractureCountLog by id
   * @request GET:/api/v1/fracture-count-log/{id}
   * @secure
   */
  fractureCountLogControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<FractureCountLog, void>({
      path: `/api/v1/fracture-count-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags fractureCountLog
   * @name FractureCountLogControllerUpdate
   * @summary Update a fractureCountLog
   * @request PUT:/api/v1/fracture-count-log/{id}
   * @secure
   */
  fractureCountLogControllerUpdate = (
    id: string,
    data: UpdateFractureCountLogDto,
    params: RequestParams = {},
  ) =>
    this.request<FractureCountLog, void>({
      path: `/api/v1/fracture-count-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags fractureCountLog
   * @name FractureCountLogControllerRemove
   * @summary Delete a fractureCountLog
   * @request DELETE:/api/v1/fracture-count-log/{id}
   * @secure
   */
  fractureCountLogControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/fracture-count-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags magSusLog
   * @name MagSusLogControllerCreate
   * @summary Create a new magSusLog
   * @request POST:/api/v1/mag-sus-log
   * @secure
   */
  magSusLogControllerCreate = (
    data: CreateMagSusLogDto,
    params: RequestParams = {},
  ) =>
    this.request<MagSusLog, void>({
      path: `/api/v1/mag-sus-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags magSusLog
   * @name MagSusLogControllerFindAll
   * @summary Get all magSusLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/mag-sus-log
   * @secure
   */
  magSusLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: MagSusLog[];
      },
      any
    >({
      path: `/api/v1/mag-sus-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags magSusLog
   * @name MagSusLogControllerFindOne
   * @summary Get a magSusLog by id
   * @request GET:/api/v1/mag-sus-log/{id}
   * @secure
   */
  magSusLogControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<MagSusLog, void>({
      path: `/api/v1/mag-sus-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags magSusLog
   * @name MagSusLogControllerUpdate
   * @summary Update a magSusLog
   * @request PUT:/api/v1/mag-sus-log/{id}
   * @secure
   */
  magSusLogControllerUpdate = (
    id: string,
    data: UpdateMagSusLogDto,
    params: RequestParams = {},
  ) =>
    this.request<MagSusLog, void>({
      path: `/api/v1/mag-sus-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags magSusLog
   * @name MagSusLogControllerRemove
   * @summary Delete a magSusLog
   * @request DELETE:/api/v1/mag-sus-log/{id}
   * @secure
   */
  magSusLogControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/mag-sus-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags rockMechanicLog
   * @name RockMechanicLogControllerCreate
   * @summary Create a new rockMechanicLog
   * @request POST:/api/v1/rock-mechanic-log
   * @secure
   */
  rockMechanicLogControllerCreate = (
    data: CreateRockMechanicLogDto,
    params: RequestParams = {},
  ) =>
    this.request<RockMechanicLog, void>({
      path: `/api/v1/rock-mechanic-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags rockMechanicLog
   * @name RockMechanicLogControllerFindAll
   * @summary Get all rockMechanicLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/rock-mechanic-log
   * @secure
   */
  rockMechanicLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: RockMechanicLog[];
      },
      any
    >({
      path: `/api/v1/rock-mechanic-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags rockMechanicLog
   * @name RockMechanicLogControllerFindOne
   * @summary Get a rockMechanicLog by id
   * @request GET:/api/v1/rock-mechanic-log/{id}
   * @secure
   */
  rockMechanicLogControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<RockMechanicLog, void>({
      path: `/api/v1/rock-mechanic-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags rockMechanicLog
   * @name RockMechanicLogControllerUpdate
   * @summary Update a rockMechanicLog
   * @request PUT:/api/v1/rock-mechanic-log/{id}
   * @secure
   */
  rockMechanicLogControllerUpdate = (
    id: string,
    data: UpdateRockMechanicLogDto,
    params: RequestParams = {},
  ) =>
    this.request<RockMechanicLog, void>({
      path: `/api/v1/rock-mechanic-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags rockMechanicLog
   * @name RockMechanicLogControllerRemove
   * @summary Delete a rockMechanicLog
   * @request DELETE:/api/v1/rock-mechanic-log/{id}
   * @secure
   */
  rockMechanicLogControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/rock-mechanic-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags rockQualityDesignationLog
   * @name RockQualityDesignationLogControllerCreate
   * @summary Create a new rockQualityDesignationLog
   * @request POST:/api/v1/rock-quality-designation-log
   * @secure
   */
  rockQualityDesignationLogControllerCreate = (
    data: CreateRockQualityDesignationLogDto,
    params: RequestParams = {},
  ) =>
    this.request<RockQualityDesignationLog, void>({
      path: `/api/v1/rock-quality-designation-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags rockQualityDesignationLog
   * @name RockQualityDesignationLogControllerFindAll
   * @summary Get all rockQualityDesignationLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/rock-quality-designation-log
   * @secure
   */
  rockQualityDesignationLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: RockQualityDesignationLog[];
      },
      any
    >({
      path: `/api/v1/rock-quality-designation-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags rockQualityDesignationLog
   * @name RockQualityDesignationLogControllerFindOne
   * @summary Get a rockQualityDesignationLog by id
   * @request GET:/api/v1/rock-quality-designation-log/{id}
   * @secure
   */
  rockQualityDesignationLogControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<RockQualityDesignationLog, void>({
      path: `/api/v1/rock-quality-designation-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags rockQualityDesignationLog
   * @name RockQualityDesignationLogControllerUpdate
   * @summary Update a rockQualityDesignationLog
   * @request PUT:/api/v1/rock-quality-designation-log/{id}
   * @secure
   */
  rockQualityDesignationLogControllerUpdate = (
    id: string,
    data: UpdateRockQualityDesignationLogDto,
    params: RequestParams = {},
  ) =>
    this.request<RockQualityDesignationLog, void>({
      path: `/api/v1/rock-quality-designation-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags rockQualityDesignationLog
   * @name RockQualityDesignationLogControllerRemove
   * @summary Delete a rockQualityDesignationLog
   * @request DELETE:/api/v1/rock-quality-designation-log/{id}
   * @secure
   */
  rockQualityDesignationLogControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/rock-quality-designation-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags specificGravityPtLog
   * @name SpecificGravityPtLogControllerCreate
   * @summary Create a new specificGravityPtLog
   * @request POST:/api/v1/specific-gravity-pt-log
   * @secure
   */
  specificGravityPtLogControllerCreate = (
    data: CreateSpecificGravityPtLogDto,
    params: RequestParams = {},
  ) =>
    this.request<SpecificGravityPtLog, void>({
      path: `/api/v1/specific-gravity-pt-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags specificGravityPtLog
   * @name SpecificGravityPtLogControllerFindAll
   * @summary Get all specificGravityPtLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/specific-gravity-pt-log
   * @secure
   */
  specificGravityPtLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: SpecificGravityPtLog[];
      },
      any
    >({
      path: `/api/v1/specific-gravity-pt-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags specificGravityPtLog
   * @name SpecificGravityPtLogControllerFindOne
   * @summary Get a specificGravityPtLog by id
   * @request GET:/api/v1/specific-gravity-pt-log/{id}
   * @secure
   */
  specificGravityPtLogControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<SpecificGravityPtLog, void>({
      path: `/api/v1/specific-gravity-pt-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags specificGravityPtLog
   * @name SpecificGravityPtLogControllerUpdate
   * @summary Update a specificGravityPtLog
   * @request PUT:/api/v1/specific-gravity-pt-log/{id}
   * @secure
   */
  specificGravityPtLogControllerUpdate = (
    id: string,
    data: UpdateSpecificGravityPtLogDto,
    params: RequestParams = {},
  ) =>
    this.request<SpecificGravityPtLog, void>({
      path: `/api/v1/specific-gravity-pt-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags specificGravityPtLog
   * @name SpecificGravityPtLogControllerRemove
   * @summary Delete a specificGravityPtLog
   * @request DELETE:/api/v1/specific-gravity-pt-log/{id}
   * @secure
   */
  specificGravityPtLogControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/specific-gravity-pt-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags labDispatch
   * @name LabDispatchControllerCreate
   * @summary Create a new labDispatch
   * @request POST:/api/v1/lab-dispatch
   * @secure
   */
  labDispatchControllerCreate = (
    data: CreateLabDispatchDto,
    params: RequestParams = {},
  ) =>
    this.request<LabDispatch, void>({
      path: `/api/v1/lab-dispatch`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags labDispatch
   * @name LabDispatchControllerFindAll
   * @summary Get all labDispatchs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/lab-dispatch
   * @secure
   */
  labDispatchControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: LabDispatch[];
      },
      any
    >({
      path: `/api/v1/lab-dispatch`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags labDispatch
   * @name LabDispatchControllerFindOne
   * @summary Get a labDispatch by id
   * @request GET:/api/v1/lab-dispatch/{id}
   * @secure
   */
  labDispatchControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<LabDispatch, void>({
      path: `/api/v1/lab-dispatch/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags labDispatch
   * @name LabDispatchControllerUpdate
   * @summary Update a labDispatch
   * @request PUT:/api/v1/lab-dispatch/{id}
   * @secure
   */
  labDispatchControllerUpdate = (
    id: string,
    data: UpdateLabDispatchDto,
    params: RequestParams = {},
  ) =>
    this.request<LabDispatch, void>({
      path: `/api/v1/lab-dispatch/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags labDispatch
   * @name LabDispatchControllerRemove
   * @summary Delete a labDispatch
   * @request DELETE:/api/v1/lab-dispatch/{id}
   * @secure
   */
  labDispatchControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/lab-dispatch/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ptSample
   * @name PtSampleControllerCreate
   * @summary Create a new ptSample
   * @request POST:/api/v1/pt-sample
   * @secure
   */
  ptSampleControllerCreate = (
    data: CreatePtSampleDto,
    params: RequestParams = {},
  ) =>
    this.request<PtSample, void>({
      path: `/api/v1/pt-sample`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ptSample
   * @name PtSampleControllerFindAll
   * @summary Get all ptSamples with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pt-sample
   * @secure
   */
  ptSampleControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: PtSample[];
      },
      any
    >({
      path: `/api/v1/pt-sample`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ptSample
   * @name PtSampleControllerFindOne
   * @summary Get a ptSample by id
   * @request GET:/api/v1/pt-sample/{id}
   * @secure
   */
  ptSampleControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<PtSample, void>({
      path: `/api/v1/pt-sample/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ptSample
   * @name PtSampleControllerUpdate
   * @summary Update a ptSample
   * @request PUT:/api/v1/pt-sample/{id}
   * @secure
   */
  ptSampleControllerUpdate = (
    id: string,
    data: UpdatePtSampleDto,
    params: RequestParams = {},
  ) =>
    this.request<PtSample, void>({
      path: `/api/v1/pt-sample/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ptSample
   * @name PtSampleControllerRemove
   * @summary Delete a ptSample
   * @request DELETE:/api/v1/pt-sample/{id}
   * @secure
   */
  ptSampleControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/pt-sample/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ptSampleQc
   * @name PtSampleQcControllerCreate
   * @summary Create a new ptSampleQc
   * @request POST:/api/v1/pt-sample-qc
   * @secure
   */
  ptSampleQcControllerCreate = (
    data: CreatePtSampleQcDto,
    params: RequestParams = {},
  ) =>
    this.request<PtSampleQc, void>({
      path: `/api/v1/pt-sample-qc`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ptSampleQc
   * @name PtSampleQcControllerFindAll
   * @summary Get all ptSampleQcs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pt-sample-qc
   * @secure
   */
  ptSampleQcControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: PtSampleQc[];
      },
      any
    >({
      path: `/api/v1/pt-sample-qc`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ptSampleQc
   * @name PtSampleQcControllerFindOne
   * @summary Get a ptSampleQc by id
   * @request GET:/api/v1/pt-sample-qc/{id}
   * @secure
   */
  ptSampleQcControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<PtSampleQc, void>({
      path: `/api/v1/pt-sample-qc/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ptSampleQc
   * @name PtSampleQcControllerUpdate
   * @summary Update a ptSampleQc
   * @request PUT:/api/v1/pt-sample-qc/{id}
   * @secure
   */
  ptSampleQcControllerUpdate = (
    id: string,
    data: UpdatePtSampleQcDto,
    params: RequestParams = {},
  ) =>
    this.request<PtSampleQc, void>({
      path: `/api/v1/pt-sample-qc/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags ptSampleQc
   * @name PtSampleQcControllerRemove
   * @summary Delete a ptSampleQc
   * @request DELETE:/api/v1/pt-sample-qc/{id}
   * @secure
   */
  ptSampleQcControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/pt-sample-qc/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags sample
   * @name SampleControllerCreate
   * @summary Create a new sample
   * @request POST:/api/v1/sample
   * @secure
   */
  sampleControllerCreate = (
    data: CreateSampleDto,
    params: RequestParams = {},
  ) =>
    this.request<Sample, void>({
      path: `/api/v1/sample`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sample
   * @name SampleControllerFindAll
   * @summary Get all samples with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sample
   * @secure
   */
  sampleControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Sample[];
      },
      any
    >({
      path: `/api/v1/sample`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sample
   * @name SampleControllerFindOne
   * @summary Get a sample by id
   * @request GET:/api/v1/sample/{id}
   * @secure
   */
  sampleControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Sample, void>({
      path: `/api/v1/sample/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sample
   * @name SampleControllerUpdate
   * @summary Update a sample
   * @request PUT:/api/v1/sample/{id}
   * @secure
   */
  sampleControllerUpdate = (
    id: string,
    data: UpdateSampleDto,
    params: RequestParams = {},
  ) =>
    this.request<Sample, void>({
      path: `/api/v1/sample/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sample
   * @name SampleControllerRemove
   * @summary Delete a sample
   * @request DELETE:/api/v1/sample/{id}
   * @secure
   */
  sampleControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/sample/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleDispatch
   * @name SampleDispatchControllerCreate
   * @summary Create a new sampleDispatch
   * @request POST:/api/v1/sample-dispatch
   * @secure
   */
  sampleDispatchControllerCreate = (
    data: CreateSampleDispatchDto,
    params: RequestParams = {},
  ) =>
    this.request<SampleDispatch, void>({
      path: `/api/v1/sample-dispatch`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleDispatch
   * @name SampleDispatchControllerFindAll
   * @summary Get all sampleDispatchs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sample-dispatch
   * @secure
   */
  sampleDispatchControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: SampleDispatch[];
      },
      any
    >({
      path: `/api/v1/sample-dispatch`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleDispatch
   * @name SampleDispatchControllerFindOne
   * @summary Get a sampleDispatch by id
   * @request GET:/api/v1/sample-dispatch/{id}
   * @secure
   */
  sampleDispatchControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<SampleDispatch, void>({
      path: `/api/v1/sample-dispatch/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleDispatch
   * @name SampleDispatchControllerUpdate
   * @summary Update a sampleDispatch
   * @request PUT:/api/v1/sample-dispatch/{id}
   * @secure
   */
  sampleDispatchControllerUpdate = (
    id: string,
    data: UpdateSampleDispatchDto,
    params: RequestParams = {},
  ) =>
    this.request<SampleDispatch, void>({
      path: `/api/v1/sample-dispatch/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleDispatch
   * @name SampleDispatchControllerRemove
   * @summary Delete a sampleDispatch
   * @request DELETE:/api/v1/sample-dispatch/{id}
   * @secure
   */
  sampleDispatchControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/sample-dispatch/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleIndex
   * @name SampleIndexControllerCreate
   * @summary Create a new sampleIndex
   * @request POST:/api/v1/sample-index
   * @secure
   */
  sampleIndexControllerCreate = (
    data: CreateSampleIndexDto,
    params: RequestParams = {},
  ) =>
    this.request<SampleIndex, void>({
      path: `/api/v1/sample-index`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleIndex
   * @name SampleIndexControllerFindAll
   * @summary Get all sampleIndexs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sample-index
   * @secure
   */
  sampleIndexControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: SampleIndex[];
      },
      any
    >({
      path: `/api/v1/sample-index`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleIndex
   * @name SampleIndexControllerFindOne
   * @summary Get a sampleIndex by id
   * @request GET:/api/v1/sample-index/{id}
   * @secure
   */
  sampleIndexControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<SampleIndex, void>({
      path: `/api/v1/sample-index/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleIndex
   * @name SampleIndexControllerUpdate
   * @summary Update a sampleIndex
   * @request PUT:/api/v1/sample-index/{id}
   * @secure
   */
  sampleIndexControllerUpdate = (
    id: string,
    data: UpdateSampleIndexDto,
    params: RequestParams = {},
  ) =>
    this.request<SampleIndex, void>({
      path: `/api/v1/sample-index/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleIndex
   * @name SampleIndexControllerRemove
   * @summary Delete a sampleIndex
   * @request DELETE:/api/v1/sample-index/{id}
   * @secure
   */
  sampleIndexControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/sample-index/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleQc
   * @name SampleQcControllerCreate
   * @summary Create a new sampleQc
   * @request POST:/api/v1/sample-qc
   * @secure
   */
  sampleQcControllerCreate = (
    data: CreateSampleQcDto,
    params: RequestParams = {},
  ) =>
    this.request<SampleQc, void>({
      path: `/api/v1/sample-qc`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleQc
   * @name SampleQcControllerFindAll
   * @summary Get all sampleQcs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sample-qc
   * @secure
   */
  sampleQcControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: SampleQc[];
      },
      any
    >({
      path: `/api/v1/sample-qc`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleQc
   * @name SampleQcControllerFindOne
   * @summary Get a sampleQc by id
   * @request GET:/api/v1/sample-qc/{id}
   * @secure
   */
  sampleQcControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<SampleQc, void>({
      path: `/api/v1/sample-qc/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleQc
   * @name SampleQcControllerUpdate
   * @summary Update a sampleQc
   * @request PUT:/api/v1/sample-qc/{id}
   * @secure
   */
  sampleQcControllerUpdate = (
    id: string,
    data: UpdateSampleQcDto,
    params: RequestParams = {},
  ) =>
    this.request<SampleQc, void>({
      path: `/api/v1/sample-qc/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleQc
   * @name SampleQcControllerRemove
   * @summary Delete a sampleQc
   * @request DELETE:/api/v1/sample-qc/{id}
   * @secure
   */
  sampleQcControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/sample-qc/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleRegister
   * @name SampleRegisterControllerCreate
   * @summary Create a new sampleRegister
   * @request POST:/api/v1/sample-register
   * @secure
   */
  sampleRegisterControllerCreate = (
    data: CreateSampleRegisterDto,
    params: RequestParams = {},
  ) =>
    this.request<SampleRegister, void>({
      path: `/api/v1/sample-register`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleRegister
   * @name SampleRegisterControllerFindAll
   * @summary Get all sampleRegisters with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sample-register
   * @secure
   */
  sampleRegisterControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: SampleRegister[];
      },
      any
    >({
      path: `/api/v1/sample-register`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleRegister
   * @name SampleRegisterControllerFindOne
   * @summary Get a sampleRegister by id
   * @request GET:/api/v1/sample-register/{id}
   * @secure
   */
  sampleRegisterControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<SampleRegister, void>({
      path: `/api/v1/sample-register/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleRegister
   * @name SampleRegisterControllerUpdate
   * @summary Update a sampleRegister
   * @request PUT:/api/v1/sample-register/{id}
   * @secure
   */
  sampleRegisterControllerUpdate = (
    id: string,
    data: UpdateSampleRegisterDto,
    params: RequestParams = {},
  ) =>
    this.request<SampleRegister, void>({
      path: `/api/v1/sample-register/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags sampleRegister
   * @name SampleRegisterControllerRemove
   * @summary Delete a sampleRegister
   * @request DELETE:/api/v1/sample-register/{id}
   * @secure
   */
  sampleRegisterControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/sample-register/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags standardSample
   * @name StandardSampleControllerCreate
   * @summary Create a new standardSample
   * @request POST:/api/v1/standard-sample
   * @secure
   */
  standardSampleControllerCreate = (
    data: CreateStandardSampleDto,
    params: RequestParams = {},
  ) =>
    this.request<StandardSample, void>({
      path: `/api/v1/standard-sample`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags standardSample
   * @name StandardSampleControllerFindAll
   * @summary Get all standardSamples with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/standard-sample
   * @secure
   */
  standardSampleControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: StandardSample[];
      },
      any
    >({
      path: `/api/v1/standard-sample`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags standardSample
   * @name StandardSampleControllerFindOne
   * @summary Get a standardSample by id
   * @request GET:/api/v1/standard-sample/{id}
   * @secure
   */
  standardSampleControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<StandardSample, void>({
      path: `/api/v1/standard-sample/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags standardSample
   * @name StandardSampleControllerUpdate
   * @summary Update a standardSample
   * @request PUT:/api/v1/standard-sample/{id}
   * @secure
   */
  standardSampleControllerUpdate = (
    id: string,
    data: UpdateStandardSampleDto,
    params: RequestParams = {},
  ) =>
    this.request<StandardSample, void>({
      path: `/api/v1/standard-sample/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags standardSample
   * @name StandardSampleControllerRemove
   * @summary Delete a standardSample
   * @request DELETE:/api/v1/standard-sample/{id}
   * @secure
   */
  standardSampleControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/standard-sample/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags standardSampleQc
   * @name StandardSampleQcControllerCreate
   * @summary Create a new standardSampleQc
   * @request POST:/api/v1/standard-sample-qc
   * @secure
   */
  standardSampleQcControllerCreate = (
    data: CreateStandardSampleQcDto,
    params: RequestParams = {},
  ) =>
    this.request<StandardSampleQc, void>({
      path: `/api/v1/standard-sample-qc`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags standardSampleQc
   * @name StandardSampleQcControllerFindAll
   * @summary Get all standardSampleQcs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/standard-sample-qc
   * @secure
   */
  standardSampleQcControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: StandardSampleQc[];
      },
      any
    >({
      path: `/api/v1/standard-sample-qc`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags standardSampleQc
   * @name StandardSampleQcControllerFindOne
   * @summary Get a standardSampleQc by id
   * @request GET:/api/v1/standard-sample-qc/{id}
   * @secure
   */
  standardSampleQcControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<StandardSampleQc, void>({
      path: `/api/v1/standard-sample-qc/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags standardSampleQc
   * @name StandardSampleQcControllerUpdate
   * @summary Update a standardSampleQc
   * @request PUT:/api/v1/standard-sample-qc/{id}
   * @secure
   */
  standardSampleQcControllerUpdate = (
    id: string,
    data: UpdateStandardSampleQcDto,
    params: RequestParams = {},
  ) =>
    this.request<StandardSampleQc, void>({
      path: `/api/v1/standard-sample-qc/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags standardSampleQc
   * @name StandardSampleQcControllerRemove
   * @summary Delete a standardSampleQc
   * @request DELETE:/api/v1/standard-sample-qc/{id}
   * @secure
   */
  standardSampleQcControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/standard-sample-qc/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfSample
   * @name XrfSampleControllerCreate
   * @summary Create a new xrfSample
   * @request POST:/api/v1/xrf-sample
   * @secure
   */
  xrfSampleControllerCreate = (
    data: CreateXrfSampleDto,
    params: RequestParams = {},
  ) =>
    this.request<XrfSample, void>({
      path: `/api/v1/xrf-sample`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfSample
   * @name XrfSampleControllerFindAll
   * @summary Get all xrfSamples with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/xrf-sample
   * @secure
   */
  xrfSampleControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: XrfSample[];
      },
      any
    >({
      path: `/api/v1/xrf-sample`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfSample
   * @name XrfSampleControllerFindOne
   * @summary Get a xrfSample by id
   * @request GET:/api/v1/xrf-sample/{id}
   * @secure
   */
  xrfSampleControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<XrfSample, void>({
      path: `/api/v1/xrf-sample/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfSample
   * @name XrfSampleControllerUpdate
   * @summary Update a xrfSample
   * @request PUT:/api/v1/xrf-sample/{id}
   * @secure
   */
  xrfSampleControllerUpdate = (
    id: string,
    data: UpdateXrfSampleDto,
    params: RequestParams = {},
  ) =>
    this.request<XrfSample, void>({
      path: `/api/v1/xrf-sample/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfSample
   * @name XrfSampleControllerRemove
   * @summary Delete a xrfSample
   * @request DELETE:/api/v1/xrf-sample/{id}
   * @secure
   */
  xrfSampleControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/xrf-sample/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfSampleQc
   * @name XrfSampleQcControllerCreate
   * @summary Create a new xrfSampleQc
   * @request POST:/api/v1/xrf-sample-qc
   * @secure
   */
  xrfSampleQcControllerCreate = (
    data: CreateXrfSampleQcDto,
    params: RequestParams = {},
  ) =>
    this.request<XrfSampleQc, void>({
      path: `/api/v1/xrf-sample-qc`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfSampleQc
   * @name XrfSampleQcControllerFindAll
   * @summary Get all xrfSampleQcs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/xrf-sample-qc
   * @secure
   */
  xrfSampleQcControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: XrfSampleQc[];
      },
      any
    >({
      path: `/api/v1/xrf-sample-qc`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfSampleQc
   * @name XrfSampleQcControllerFindOne
   * @summary Get a xrfSampleQc by id
   * @request GET:/api/v1/xrf-sample-qc/{id}
   * @secure
   */
  xrfSampleQcControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<XrfSampleQc, void>({
      path: `/api/v1/xrf-sample-qc/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfSampleQc
   * @name XrfSampleQcControllerUpdate
   * @summary Update a xrfSampleQc
   * @request PUT:/api/v1/xrf-sample-qc/{id}
   * @secure
   */
  xrfSampleQcControllerUpdate = (
    id: string,
    data: UpdateXrfSampleQcDto,
    params: RequestParams = {},
  ) =>
    this.request<XrfSampleQc, void>({
      path: `/api/v1/xrf-sample-qc/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfSampleQc
   * @name XrfSampleQcControllerRemove
   * @summary Delete a xrfSampleQc
   * @request DELETE:/api/v1/xrf-sample-qc/{id}
   * @secure
   */
  xrfSampleQcControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/xrf-sample-qc/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfStandardSample
   * @name XrfStandardSampleControllerCreate
   * @summary Create a new xrfStandardSample
   * @request POST:/api/v1/xrf-standard-sample
   * @secure
   */
  xrfStandardSampleControllerCreate = (
    data: CreateXrfStandardSampleDto,
    params: RequestParams = {},
  ) =>
    this.request<XrfStandardSample, void>({
      path: `/api/v1/xrf-standard-sample`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfStandardSample
   * @name XrfStandardSampleControllerFindAll
   * @summary Get all xrfStandardSamples with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/xrf-standard-sample
   * @secure
   */
  xrfStandardSampleControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: XrfStandardSample[];
      },
      any
    >({
      path: `/api/v1/xrf-standard-sample`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfStandardSample
   * @name XrfStandardSampleControllerFindOne
   * @summary Get a xrfStandardSample by id
   * @request GET:/api/v1/xrf-standard-sample/{id}
   * @secure
   */
  xrfStandardSampleControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<XrfStandardSample, void>({
      path: `/api/v1/xrf-standard-sample/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfStandardSample
   * @name XrfStandardSampleControllerUpdate
   * @summary Update a xrfStandardSample
   * @request PUT:/api/v1/xrf-standard-sample/{id}
   * @secure
   */
  xrfStandardSampleControllerUpdate = (
    id: string,
    data: UpdateXrfStandardSampleDto,
    params: RequestParams = {},
  ) =>
    this.request<XrfStandardSample, void>({
      path: `/api/v1/xrf-standard-sample/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfStandardSample
   * @name XrfStandardSampleControllerRemove
   * @summary Delete a xrfStandardSample
   * @request DELETE:/api/v1/xrf-standard-sample/{id}
   * @secure
   */
  xrfStandardSampleControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/xrf-standard-sample/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SamplesAll Upsert
   * @name SamplesAllControllerFindAll
   * @summary Get all samples with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/api/samples
   * @secure
   */
  samplesAllControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: AllSamples[];
      },
      any
    >({
      path: `/api/v1/api/samples`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SamplesAll Upsert
   * @name SamplesAllControllerGetLatestSampleIdByPrefix
   * @summary Get the latest SampleID that starts with a given prefix
   * @request GET:/api/v1/api/samples/latest-sample-id
   * @secure
   */
  samplesAllControllerGetLatestSampleIdByPrefix = (
    query: {
      /** The prefix to search for in SampleID */
      prefix: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, void>({
      path: `/api/v1/api/samples/latest-sample-id`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SamplesAll Upsert
   * @name SamplesAllControllerFindOne
   * @summary Get a sample by id
   * @request GET:/api/v1/api/samples/{id}
   * @secure
   */
  samplesAllControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<AllSamples, void>({
      path: `/api/v1/api/samples/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SamplesAll Upsert
   * @name SamplesAllControllerUpdate
   * @summary Update a sample
   * @request PUT:/api/v1/api/samples/{id}
   * @secure
   */
  samplesAllControllerUpdate = (
    id: string,
    data: UpdateAllSamplesDto,
    params: RequestParams = {},
  ) =>
    this.request<AllSamples, void>({
      path: `/api/v1/api/samples/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags SamplesAll Upsert
   * @name SamplesAllControllerRemove
   * @summary Delete a sample
   * @request DELETE:/api/v1/api/samples/{id}
   * @secure
   */
  samplesAllControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/api/samples/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags SamplesAll Upsert
   * @name SamplesAllControllerBulkUpsert
   * @summary Bulk create or update samples (upsert) - Routes to appropriate Sample.* tables
   * @request POST:/api/v1/api/samples/bulk-upsert
   * @secure
   */
  samplesAllControllerBulkUpsert = (
    data: AllSamples[],
    params: RequestParams = {},
  ) =>
    this.request<AllSamples[], void>({
      path: `/api/v1/api/samples/bulk-upsert`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Returns notifications formatted for frontend display with relative time strings
   *
   * @tags notifications
   * @name NotificationControllerFindAllFormatted
   * @summary Get all notifications with formatted dates
   * @request GET:/api/v1/notifications
   */
  notificationControllerFindAllFormatted = (
    query?: {
      /** Filter by user ID */
      userId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<NotificationResponseDto[], any>({
      path: `/api/v1/notifications`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags notifications
   * @name NotificationControllerCreate
   * @summary Create a new notification
   * @request POST:/api/v1/notifications
   * @secure
   */
  notificationControllerCreate = (
    data: CreateNotificationDto,
    params: RequestParams = {},
  ) =>
    this.request<Notification, void>({
      path: `/api/v1/notifications`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Returns paginated notifications with full entity data
   *
   * @tags notifications
   * @name NotificationControllerFindAll
   * @summary Get notifications with pagination, filtering, and sorting
   * @request GET:/api/v1/notifications/paginated
   * @secure
   */
  notificationControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Notification[];
      },
      any
    >({
      path: `/api/v1/notifications/paginated`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags notifications
   * @name NotificationControllerGetUnreadCount
   * @summary Get unread notification count for a user
   * @request GET:/api/v1/notifications/unread/count
   * @secure
   */
  notificationControllerGetUnreadCount = (
    query: {
      /** User ID */
      userId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 5 */
        count?: number;
      },
      any
    >({
      path: `/api/v1/notifications/unread/count`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags notifications
   * @name NotificationControllerMarkAllAsRead
   * @summary Mark all notifications as read for a user
   * @request PATCH:/api/v1/notifications/mark-all-read
   * @secure
   */
  notificationControllerMarkAllAsRead = (
    query: {
      /** User ID */
      userId: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/notifications/mark-all-read`,
      method: "PATCH",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags notifications
   * @name NotificationControllerFindOne
   * @summary Get a notification by ID
   * @request GET:/api/v1/notifications/{id}
   * @secure
   */
  notificationControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Notification, void>({
      path: `/api/v1/notifications/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags notifications
   * @name NotificationControllerUpdate
   * @summary Update a notification
   * @request PUT:/api/v1/notifications/{id}
   * @secure
   */
  notificationControllerUpdate = (
    id: string,
    data: UpdateNotificationDto,
    params: RequestParams = {},
  ) =>
    this.request<Notification, void>({
      path: `/api/v1/notifications/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags notifications
   * @name NotificationControllerRemove
   * @summary Delete a notification
   * @request DELETE:/api/v1/notifications/{id}
   * @secure
   */
  notificationControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/notifications/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags notifications
   * @name NotificationControllerMarkAsRead
   * @summary Mark a notification as read
   * @request PATCH:/api/v1/notifications/{id}/read
   * @secure
   */
  notificationControllerMarkAsRead = (id: string, params: RequestParams = {}) =>
    this.request<Notification, void>({
      path: `/api/v1/notifications/${id}/read`,
      method: "PATCH",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Two-way sync between client IndexedDB and server database. Supports all entities dynamically with chunking for large change sets.
   *
   * @tags sync
   * @name SyncControllerSync
   * @summary Dexie-Syncable Protocol Endpoint
   * @request POST:/api/v1/sync
   * @secure
   */
  syncControllerSync = (data: SyncRequestDto, params: RequestParams = {}) =>
    this.request<SyncResponseDto, void>({
      path: `/api/v1/sync`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Fetch updated records for multiple tables based on rowversion. Returns all records where ActiveInd = 1 and rv > provided rv for each table.
   *
   * @tags sync
   * @name SyncControllerSyncRv
   * @summary Rowversion-based sync for multiple tables
   * @request POST:/api/v1/sync/rv
   * @secure
   */
  syncControllerSyncRv = (data: SyncRvRequestDto, params: RequestParams = {}) =>
    this.request<SyncRvResponseDto, void>({
      path: `/api/v1/sync/rv`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Remove sync change log entries older than specified days (default: 90 days). This helps maintain database performance.
   *
   * @tags sync
   * @name SyncControllerCleanup
   * @summary Cleanup old sync change logs
   * @request POST:/api/v1/sync/cleanup
   * @secure
   */
  syncControllerCleanup = (
    query?: {
      /**
       * Number of days of change history to retain
       * @example 90
       */
      daysToKeep?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example 15000 */
        deletedRows?: number;
        /** @example 90 */
        daysKept?: number;
        /** @example "Cleaned up 15000 old change log entries" */
        message?: string;
      },
      void
    >({
      path: `/api/v1/sync/cleanup`,
      method: "POST",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Check sync table sizes, retention, and system status. Use for monitoring and alerts.
   *
   * @tags sync
   * @name SyncControllerHealth
   * @summary Sync system health check
   * @request GET:/api/v1/sync/health
   * @secure
   */
  syncControllerHealth = (params: RequestParams = {}) =>
    this.request<
      {
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
      },
      void
    >({
      path: `/api/v1/sync/health`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieve sync state for a specific client including last sync revision and pending changes.
   *
   * @tags sync
   * @name SyncControllerGetStatus
   * @summary Get client sync status
   * @request GET:/api/v1/sync/status
   * @secure
   */
  syncControllerGetStatus = (
    query?: {
      /** Client identifier (defaults to current user) */
      clientId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
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
      },
      void
    >({
      path: `/api/v1/sync/status`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatch
   * @name AssayBatchControllerCreate
   * @summary Create a new assayBatch
   * @request POST:/api/v1/assay-batch
   * @secure
   */
  assayBatchControllerCreate = (
    data: CreateAssayBatchDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayBatch, void>({
      path: `/api/v1/assay-batch`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatch
   * @name AssayBatchControllerFindAll
   * @summary Get all assayBatchs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-batch
   * @secure
   */
  assayBatchControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: AssayBatch[];
      },
      any
    >({
      path: `/api/v1/assay-batch`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatch
   * @name AssayBatchControllerFindOne
   * @summary Get a assayBatch by id
   * @request GET:/api/v1/assay-batch/{id}
   * @secure
   */
  assayBatchControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<AssayBatch, void>({
      path: `/api/v1/assay-batch/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatch
   * @name AssayBatchControllerUpdate
   * @summary Update a assayBatch
   * @request PUT:/api/v1/assay-batch/{id}
   * @secure
   */
  assayBatchControllerUpdate = (
    id: string,
    data: UpdateAssayBatchDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayBatch, void>({
      path: `/api/v1/assay-batch/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatch
   * @name AssayBatchControllerRemove
   * @summary Delete a assayBatch
   * @request DELETE:/api/v1/assay-batch/{id}
   * @secure
   */
  assayBatchControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/assay-batch/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchDetail
   * @name AssayBatchDetailControllerCreate
   * @summary Create a new assayBatchDetail
   * @request POST:/api/v1/assay-batch-detail
   * @secure
   */
  assayBatchDetailControllerCreate = (
    data: CreateAssayBatchDetailDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayBatchDetail, void>({
      path: `/api/v1/assay-batch-detail`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchDetail
   * @name AssayBatchDetailControllerFindAll
   * @summary Get all assayBatchDetails with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-batch-detail
   * @secure
   */
  assayBatchDetailControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: AssayBatchDetail[];
      },
      any
    >({
      path: `/api/v1/assay-batch-detail`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchDetail
   * @name AssayBatchDetailControllerFindOne
   * @summary Get a assayBatchDetail by id
   * @request GET:/api/v1/assay-batch-detail/{id}
   * @secure
   */
  assayBatchDetailControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<AssayBatchDetail, void>({
      path: `/api/v1/assay-batch-detail/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchDetail
   * @name AssayBatchDetailControllerUpdate
   * @summary Update a assayBatchDetail
   * @request PUT:/api/v1/assay-batch-detail/{id}
   * @secure
   */
  assayBatchDetailControllerUpdate = (
    id: string,
    data: UpdateAssayBatchDetailDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayBatchDetail, void>({
      path: `/api/v1/assay-batch-detail/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchDetail
   * @name AssayBatchDetailControllerRemove
   * @summary Delete a assayBatchDetail
   * @request DELETE:/api/v1/assay-batch-detail/{id}
   * @secure
   */
  assayBatchDetailControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/assay-batch-detail/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchStatus
   * @name AssayBatchStatusControllerCreate
   * @summary Create a new assayBatchStatus
   * @request POST:/api/v1/assay-batch-status
   * @secure
   */
  assayBatchStatusControllerCreate = (
    data: CreateAssayBatchStatusDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayBatchStatus, void>({
      path: `/api/v1/assay-batch-status`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchStatus
   * @name AssayBatchStatusControllerFindAll
   * @summary Get all assayBatchStatuss with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-batch-status
   * @secure
   */
  assayBatchStatusControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: AssayBatchStatus[];
      },
      any
    >({
      path: `/api/v1/assay-batch-status`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchStatus
   * @name AssayBatchStatusControllerFindOne
   * @summary Get a assayBatchStatus by id
   * @request GET:/api/v1/assay-batch-status/{id}
   * @secure
   */
  assayBatchStatusControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<AssayBatchStatus, void>({
      path: `/api/v1/assay-batch-status/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchStatus
   * @name AssayBatchStatusControllerUpdate
   * @summary Update a assayBatchStatus
   * @request PUT:/api/v1/assay-batch-status/{id}
   * @secure
   */
  assayBatchStatusControllerUpdate = (
    id: string,
    data: UpdateAssayBatchStatusDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayBatchStatus, void>({
      path: `/api/v1/assay-batch-status/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchStatus
   * @name AssayBatchStatusControllerRemove
   * @summary Delete a assayBatchStatus
   * @request DELETE:/api/v1/assay-batch-status/{id}
   * @secure
   */
  assayBatchStatusControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/assay-batch-status/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchStatusLog
   * @name AssayBatchStatusLogControllerCreate
   * @summary Create a new assayBatchStatusLog
   * @request POST:/api/v1/assay-batch-status-log
   * @secure
   */
  assayBatchStatusLogControllerCreate = (
    data: CreateAssayBatchStatusLogDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayBatchStatusLog, void>({
      path: `/api/v1/assay-batch-status-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchStatusLog
   * @name AssayBatchStatusLogControllerFindAll
   * @summary Get all assayBatchStatusLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-batch-status-log
   * @secure
   */
  assayBatchStatusLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: AssayBatchStatusLog[];
      },
      any
    >({
      path: `/api/v1/assay-batch-status-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchStatusLog
   * @name AssayBatchStatusLogControllerFindOne
   * @summary Get a assayBatchStatusLog by id
   * @request GET:/api/v1/assay-batch-status-log/{id}
   * @secure
   */
  assayBatchStatusLogControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<AssayBatchStatusLog, void>({
      path: `/api/v1/assay-batch-status-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchStatusLog
   * @name AssayBatchStatusLogControllerUpdate
   * @summary Update a assayBatchStatusLog
   * @request PUT:/api/v1/assay-batch-status-log/{id}
   * @secure
   */
  assayBatchStatusLogControllerUpdate = (
    id: string,
    data: UpdateAssayBatchStatusLogDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayBatchStatusLog, void>({
      path: `/api/v1/assay-batch-status-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayBatchStatusLog
   * @name AssayBatchStatusLogControllerRemove
   * @summary Delete a assayBatchStatusLog
   * @request DELETE:/api/v1/assay-batch-status-log/{id}
   * @secure
   */
  assayBatchStatusLogControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/assay-batch-status-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags assayElement
   * @name AssayElementControllerCreate
   * @summary Create a new assayElement
   * @request POST:/api/v1/assay-element
   * @secure
   */
  assayElementControllerCreate = (
    data: CreateAssayElementDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayElement, void>({
      path: `/api/v1/assay-element`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayElement
   * @name AssayElementControllerFindAll
   * @summary Get all assayElements with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-element
   * @secure
   */
  assayElementControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: AssayElement[];
      },
      any
    >({
      path: `/api/v1/assay-element`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayElement
   * @name AssayElementControllerFindOne
   * @summary Get a assayElement by id
   * @request GET:/api/v1/assay-element/{id}
   * @secure
   */
  assayElementControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<AssayElement, void>({
      path: `/api/v1/assay-element/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayElement
   * @name AssayElementControllerUpdate
   * @summary Update a assayElement
   * @request PUT:/api/v1/assay-element/{id}
   * @secure
   */
  assayElementControllerUpdate = (
    id: string,
    data: UpdateAssayElementDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayElement, void>({
      path: `/api/v1/assay-element/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayElement
   * @name AssayElementControllerRemove
   * @summary Delete a assayElement
   * @request DELETE:/api/v1/assay-element/{id}
   * @secure
   */
  assayElementControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/assay-element/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags assayElementGroup
   * @name AssayElementGroupControllerCreate
   * @summary Create a new assayElementGroup
   * @request POST:/api/v1/assay-element-group
   * @secure
   */
  assayElementGroupControllerCreate = (
    data: CreateAssayElementGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayElementGroup, void>({
      path: `/api/v1/assay-element-group`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayElementGroup
   * @name AssayElementGroupControllerFindAll
   * @summary Get all assayElementGroups with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-element-group
   * @secure
   */
  assayElementGroupControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: AssayElementGroup[];
      },
      any
    >({
      path: `/api/v1/assay-element-group`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayElementGroup
   * @name AssayElementGroupControllerFindOne
   * @summary Get a assayElementGroup by id
   * @request GET:/api/v1/assay-element-group/{id}
   * @secure
   */
  assayElementGroupControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<AssayElementGroup, void>({
      path: `/api/v1/assay-element-group/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayElementGroup
   * @name AssayElementGroupControllerUpdate
   * @summary Update a assayElementGroup
   * @request PUT:/api/v1/assay-element-group/{id}
   * @secure
   */
  assayElementGroupControllerUpdate = (
    id: string,
    data: UpdateAssayElementGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayElementGroup, void>({
      path: `/api/v1/assay-element-group/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayElementGroup
   * @name AssayElementGroupControllerRemove
   * @summary Delete a assayElementGroup
   * @request DELETE:/api/v1/assay-element-group/{id}
   * @secure
   */
  assayElementGroupControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/assay-element-group/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLab
   * @name AssayLabControllerCreate
   * @summary Create a new assayLab
   * @request POST:/api/v1/assay-lab
   * @secure
   */
  assayLabControllerCreate = (
    data: CreateAssayLabDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayLab, void>({
      path: `/api/v1/assay-lab`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLab
   * @name AssayLabControllerFindAll
   * @summary Get all assayLabs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-lab
   * @secure
   */
  assayLabControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: AssayLab[];
      },
      any
    >({
      path: `/api/v1/assay-lab`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLab
   * @name AssayLabControllerFindOne
   * @summary Get a assayLab by id
   * @request GET:/api/v1/assay-lab/{id}
   * @secure
   */
  assayLabControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<AssayLab, void>({
      path: `/api/v1/assay-lab/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLab
   * @name AssayLabControllerUpdate
   * @summary Update a assayLab
   * @request PUT:/api/v1/assay-lab/{id}
   * @secure
   */
  assayLabControllerUpdate = (
    id: string,
    data: UpdateAssayLabDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayLab, void>({
      path: `/api/v1/assay-lab/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLab
   * @name AssayLabControllerRemove
   * @summary Delete a assayLab
   * @request DELETE:/api/v1/assay-lab/{id}
   * @secure
   */
  assayLabControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/assay-lab/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLabElementAlias
   * @name AssayLabElementAliasControllerCreate
   * @summary Create a new assayLabElementAlias
   * @request POST:/api/v1/assay-lab-element-alias
   * @secure
   */
  assayLabElementAliasControllerCreate = (
    data: CreateAssayLabElementAliasDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayLabElementAlias, void>({
      path: `/api/v1/assay-lab-element-alias`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLabElementAlias
   * @name AssayLabElementAliasControllerFindAll
   * @summary Get all assayLabElementAliass with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-lab-element-alias
   * @secure
   */
  assayLabElementAliasControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: AssayLabElementAlias[];
      },
      any
    >({
      path: `/api/v1/assay-lab-element-alias`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLabElementAlias
   * @name AssayLabElementAliasControllerFindOne
   * @summary Get a assayLabElementAlias by id
   * @request GET:/api/v1/assay-lab-element-alias/{id}
   * @secure
   */
  assayLabElementAliasControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<AssayLabElementAlias, void>({
      path: `/api/v1/assay-lab-element-alias/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLabElementAlias
   * @name AssayLabElementAliasControllerUpdate
   * @summary Update a assayLabElementAlias
   * @request PUT:/api/v1/assay-lab-element-alias/{id}
   * @secure
   */
  assayLabElementAliasControllerUpdate = (
    id: string,
    data: UpdateAssayLabElementAliasDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayLabElementAlias, void>({
      path: `/api/v1/assay-lab-element-alias/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLabElementAlias
   * @name AssayLabElementAliasControllerRemove
   * @summary Delete a assayLabElementAlias
   * @request DELETE:/api/v1/assay-lab-element-alias/{id}
   * @secure
   */
  assayLabElementAliasControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/assay-lab-element-alias/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLabMethod
   * @name AssayLabMethodControllerCreate
   * @summary Create a new assayLabMethod
   * @request POST:/api/v1/assay-lab-method
   * @secure
   */
  assayLabMethodControllerCreate = (
    data: CreateAssayLabMethodDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayLabMethod, void>({
      path: `/api/v1/assay-lab-method`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLabMethod
   * @name AssayLabMethodControllerFindAll
   * @summary Get all assayLabMethods with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-lab-method
   * @secure
   */
  assayLabMethodControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: AssayLabMethod[];
      },
      any
    >({
      path: `/api/v1/assay-lab-method`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLabMethod
   * @name AssayLabMethodControllerFindOne
   * @summary Get a assayLabMethod by id
   * @request GET:/api/v1/assay-lab-method/{id}
   * @secure
   */
  assayLabMethodControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<AssayLabMethod, void>({
      path: `/api/v1/assay-lab-method/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLabMethod
   * @name AssayLabMethodControllerUpdate
   * @summary Update a assayLabMethod
   * @request PUT:/api/v1/assay-lab-method/{id}
   * @secure
   */
  assayLabMethodControllerUpdate = (
    id: string,
    data: UpdateAssayLabMethodDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayLabMethod, void>({
      path: `/api/v1/assay-lab-method/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayLabMethod
   * @name AssayLabMethodControllerRemove
   * @summary Delete a assayLabMethod
   * @request DELETE:/api/v1/assay-lab-method/{id}
   * @secure
   */
  assayLabMethodControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/assay-lab-method/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags assayMethodGeneric
   * @name AssayMethodGenericControllerCreate
   * @summary Create a new assayMethodGeneric
   * @request POST:/api/v1/assay-method-generic
   * @secure
   */
  assayMethodGenericControllerCreate = (
    data: CreateAssayMethodGenericDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayMethodGeneric, void>({
      path: `/api/v1/assay-method-generic`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayMethodGeneric
   * @name AssayMethodGenericControllerFindAll
   * @summary Get all assayMethodGenerics with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay-method-generic
   * @secure
   */
  assayMethodGenericControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: AssayMethodGeneric[];
      },
      any
    >({
      path: `/api/v1/assay-method-generic`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayMethodGeneric
   * @name AssayMethodGenericControllerFindOne
   * @summary Get a assayMethodGeneric by id
   * @request GET:/api/v1/assay-method-generic/{id}
   * @secure
   */
  assayMethodGenericControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<AssayMethodGeneric, void>({
      path: `/api/v1/assay-method-generic/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayMethodGeneric
   * @name AssayMethodGenericControllerUpdate
   * @summary Update a assayMethodGeneric
   * @request PUT:/api/v1/assay-method-generic/{id}
   * @secure
   */
  assayMethodGenericControllerUpdate = (
    id: string,
    data: UpdateAssayMethodGenericDto,
    params: RequestParams = {},
  ) =>
    this.request<AssayMethodGeneric, void>({
      path: `/api/v1/assay-method-generic/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assayMethodGeneric
   * @name AssayMethodGenericControllerRemove
   * @summary Delete a assayMethodGeneric
   * @request DELETE:/api/v1/assay-method-generic/{id}
   * @secure
   */
  assayMethodGenericControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/assay-method-generic/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcAnalysisType
   * @name QcAnalysisTypeControllerCreate
   * @summary Create a new qcAnalysisType
   * @request POST:/api/v1/qc-analysis-type
   * @secure
   */
  qcAnalysisTypeControllerCreate = (
    data: CreateQcAnalysisTypeDto,
    params: RequestParams = {},
  ) =>
    this.request<QcAnalysisType, void>({
      path: `/api/v1/qc-analysis-type`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcAnalysisType
   * @name QcAnalysisTypeControllerFindAll
   * @summary Get all qcAnalysisTypes with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-analysis-type
   * @secure
   */
  qcAnalysisTypeControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcAnalysisType[];
      },
      any
    >({
      path: `/api/v1/qc-analysis-type`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcAnalysisType
   * @name QcAnalysisTypeControllerFindOne
   * @summary Get a qcAnalysisType by id
   * @request GET:/api/v1/qc-analysis-type/{id}
   * @secure
   */
  qcAnalysisTypeControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<QcAnalysisType, void>({
      path: `/api/v1/qc-analysis-type/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcAnalysisType
   * @name QcAnalysisTypeControllerUpdate
   * @summary Update a qcAnalysisType
   * @request PUT:/api/v1/qc-analysis-type/{id}
   * @secure
   */
  qcAnalysisTypeControllerUpdate = (
    id: string,
    data: UpdateQcAnalysisTypeDto,
    params: RequestParams = {},
  ) =>
    this.request<QcAnalysisType, void>({
      path: `/api/v1/qc-analysis-type/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcAnalysisType
   * @name QcAnalysisTypeControllerRemove
   * @summary Delete a qcAnalysisType
   * @request DELETE:/api/v1/qc-analysis-type/{id}
   * @secure
   */
  qcAnalysisTypeControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/qc-analysis-type/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcClassification
   * @name QcClassificationControllerCreate
   * @summary Create a new qcClassification
   * @request POST:/api/v1/qc-classification
   * @secure
   */
  qcClassificationControllerCreate = (
    data: CreateQcClassificationDto,
    params: RequestParams = {},
  ) =>
    this.request<QcClassification, void>({
      path: `/api/v1/qc-classification`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcClassification
   * @name QcClassificationControllerFindAll
   * @summary Get all qcClassifications with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-classification
   * @secure
   */
  qcClassificationControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcClassification[];
      },
      any
    >({
      path: `/api/v1/qc-classification`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcClassification
   * @name QcClassificationControllerFindOne
   * @summary Get a qcClassification by id
   * @request GET:/api/v1/qc-classification/{id}
   * @secure
   */
  qcClassificationControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<QcClassification, void>({
      path: `/api/v1/qc-classification/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcClassification
   * @name QcClassificationControllerUpdate
   * @summary Update a qcClassification
   * @request PUT:/api/v1/qc-classification/{id}
   * @secure
   */
  qcClassificationControllerUpdate = (
    id: string,
    data: UpdateQcClassificationDto,
    params: RequestParams = {},
  ) =>
    this.request<QcClassification, void>({
      path: `/api/v1/qc-classification/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcClassification
   * @name QcClassificationControllerRemove
   * @summary Delete a qcClassification
   * @request DELETE:/api/v1/qc-classification/{id}
   * @secure
   */
  qcClassificationControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/qc-classification/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcFilteredset
   * @name QcFilteredsetControllerCreate
   * @summary Create a new qcFilteredset
   * @request POST:/api/v1/qc-filteredset
   * @secure
   */
  qcFilteredsetControllerCreate = (
    data: CreateQcFilteredsetDto,
    params: RequestParams = {},
  ) =>
    this.request<QcFilteredset, void>({
      path: `/api/v1/qc-filteredset`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcFilteredset
   * @name QcFilteredsetControllerFindAll
   * @summary Get all qcFilteredsets with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-filteredset
   * @secure
   */
  qcFilteredsetControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcFilteredset[];
      },
      any
    >({
      path: `/api/v1/qc-filteredset`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcFilteredset
   * @name QcFilteredsetControllerFindOne
   * @summary Get a qcFilteredset by id
   * @request GET:/api/v1/qc-filteredset/{id}
   * @secure
   */
  qcFilteredsetControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<QcFilteredset, void>({
      path: `/api/v1/qc-filteredset/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcFilteredset
   * @name QcFilteredsetControllerUpdate
   * @summary Update a qcFilteredset
   * @request PUT:/api/v1/qc-filteredset/{id}
   * @secure
   */
  qcFilteredsetControllerUpdate = (
    id: string,
    data: UpdateQcFilteredsetDto,
    params: RequestParams = {},
  ) =>
    this.request<QcFilteredset, void>({
      path: `/api/v1/qc-filteredset/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcFilteredset
   * @name QcFilteredsetControllerRemove
   * @summary Delete a qcFilteredset
   * @request DELETE:/api/v1/qc-filteredset/{id}
   * @secure
   */
  qcFilteredsetControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/qc-filteredset/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcGroup
   * @name QcGroupControllerCreate
   * @summary Create a new qcGroup
   * @request POST:/api/v1/qc-group
   * @secure
   */
  qcGroupControllerCreate = (
    data: CreateQcGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<QcGroup, void>({
      path: `/api/v1/qc-group`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcGroup
   * @name QcGroupControllerFindAll
   * @summary Get all qcGroups with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-group
   * @secure
   */
  qcGroupControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcGroup[];
      },
      any
    >({
      path: `/api/v1/qc-group`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcGroup
   * @name QcGroupControllerFindOne
   * @summary Get a qcGroup by id
   * @request GET:/api/v1/qc-group/{id}
   * @secure
   */
  qcGroupControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<QcGroup, void>({
      path: `/api/v1/qc-group/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcGroup
   * @name QcGroupControllerUpdate
   * @summary Update a qcGroup
   * @request PUT:/api/v1/qc-group/{id}
   * @secure
   */
  qcGroupControllerUpdate = (
    id: string,
    data: UpdateQcGroupDto,
    params: RequestParams = {},
  ) =>
    this.request<QcGroup, void>({
      path: `/api/v1/qc-group/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcGroup
   * @name QcGroupControllerRemove
   * @summary Delete a qcGroup
   * @request DELETE:/api/v1/qc-group/{id}
   * @secure
   */
  qcGroupControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/qc-group/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcInsertionRule
   * @name QcInsertionRuleControllerCreate
   * @summary Create a new qcInsertionRule
   * @request POST:/api/v1/qc-insertion-rule
   * @secure
   */
  qcInsertionRuleControllerCreate = (
    data: CreateQcInsertionRuleDto,
    params: RequestParams = {},
  ) =>
    this.request<QcInsertionRule, void>({
      path: `/api/v1/qc-insertion-rule`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcInsertionRule
   * @name QcInsertionRuleControllerFindAll
   * @summary Get all qcInsertionRules with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-insertion-rule
   * @secure
   */
  qcInsertionRuleControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcInsertionRule[];
      },
      any
    >({
      path: `/api/v1/qc-insertion-rule`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcInsertionRule
   * @name QcInsertionRuleControllerFindOne
   * @summary Get a qcInsertionRule by id
   * @request GET:/api/v1/qc-insertion-rule/{id}
   * @secure
   */
  qcInsertionRuleControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<QcInsertionRule, void>({
      path: `/api/v1/qc-insertion-rule/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcInsertionRule
   * @name QcInsertionRuleControllerUpdate
   * @summary Update a qcInsertionRule
   * @request PUT:/api/v1/qc-insertion-rule/{id}
   * @secure
   */
  qcInsertionRuleControllerUpdate = (
    id: string,
    data: UpdateQcInsertionRuleDto,
    params: RequestParams = {},
  ) =>
    this.request<QcInsertionRule, void>({
      path: `/api/v1/qc-insertion-rule/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcInsertionRule
   * @name QcInsertionRuleControllerRemove
   * @summary Delete a qcInsertionRule
   * @request DELETE:/api/v1/qc-insertion-rule/{id}
   * @secure
   */
  qcInsertionRuleControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/qc-insertion-rule/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcInsertionRuleStandardSequence
   * @name QcInsertionRuleStandardSequenceControllerCreate
   * @summary Create a new qcInsertionRuleStandardSequence
   * @request POST:/api/v1/qc-insertion-rule-standard-sequence
   * @secure
   */
  qcInsertionRuleStandardSequenceControllerCreate = (
    data: CreateQcInsertionRuleStandardSequenceDto,
    params: RequestParams = {},
  ) =>
    this.request<QcInsertionRuleStandardSequence, void>({
      path: `/api/v1/qc-insertion-rule-standard-sequence`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcInsertionRuleStandardSequence
   * @name QcInsertionRuleStandardSequenceControllerFindAll
   * @summary Get all qcInsertionRuleStandardSequences with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-insertion-rule-standard-sequence
   * @secure
   */
  qcInsertionRuleStandardSequenceControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcInsertionRuleStandardSequence[];
      },
      any
    >({
      path: `/api/v1/qc-insertion-rule-standard-sequence`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcInsertionRuleStandardSequence
   * @name QcInsertionRuleStandardSequenceControllerFindOne
   * @summary Get a qcInsertionRuleStandardSequence by id
   * @request GET:/api/v1/qc-insertion-rule-standard-sequence/{id}
   * @secure
   */
  qcInsertionRuleStandardSequenceControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<QcInsertionRuleStandardSequence, void>({
      path: `/api/v1/qc-insertion-rule-standard-sequence/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcInsertionRuleStandardSequence
   * @name QcInsertionRuleStandardSequenceControllerUpdate
   * @summary Update a qcInsertionRuleStandardSequence
   * @request PUT:/api/v1/qc-insertion-rule-standard-sequence/{id}
   * @secure
   */
  qcInsertionRuleStandardSequenceControllerUpdate = (
    id: string,
    data: UpdateQcInsertionRuleStandardSequenceDto,
    params: RequestParams = {},
  ) =>
    this.request<QcInsertionRuleStandardSequence, void>({
      path: `/api/v1/qc-insertion-rule-standard-sequence/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcInsertionRuleStandardSequence
   * @name QcInsertionRuleStandardSequenceControllerRemove
   * @summary Delete a qcInsertionRuleStandardSequence
   * @request DELETE:/api/v1/qc-insertion-rule-standard-sequence/{id}
   * @secure
   */
  qcInsertionRuleStandardSequenceControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/qc-insertion-rule-standard-sequence/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReference
   * @name QcReferenceControllerCreate
   * @summary Create a new qcReference
   * @request POST:/api/v1/qc-reference
   * @secure
   */
  qcReferenceControllerCreate = (
    data: CreateQcReferenceDto,
    params: RequestParams = {},
  ) =>
    this.request<QcReference, void>({
      path: `/api/v1/qc-reference`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReference
   * @name QcReferenceControllerFindAll
   * @summary Get all qcReferences with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-reference
   * @secure
   */
  qcReferenceControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcReference[];
      },
      any
    >({
      path: `/api/v1/qc-reference`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReference
   * @name QcReferenceControllerFindOne
   * @summary Get a qcReference by id
   * @request GET:/api/v1/qc-reference/{id}
   * @secure
   */
  qcReferenceControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<QcReference, void>({
      path: `/api/v1/qc-reference/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReference
   * @name QcReferenceControllerUpdate
   * @summary Update a qcReference
   * @request PUT:/api/v1/qc-reference/{id}
   * @secure
   */
  qcReferenceControllerUpdate = (
    id: string,
    data: UpdateQcReferenceDto,
    params: RequestParams = {},
  ) =>
    this.request<QcReference, void>({
      path: `/api/v1/qc-reference/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReference
   * @name QcReferenceControllerRemove
   * @summary Delete a qcReference
   * @request DELETE:/api/v1/qc-reference/{id}
   * @secure
   */
  qcReferenceControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/qc-reference/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceType
   * @name QcReferenceTypeControllerCreate
   * @summary Create a new qcReferenceType
   * @request POST:/api/v1/qc-reference-type
   * @secure
   */
  qcReferenceTypeControllerCreate = (
    data: CreateQcReferenceTypeDto,
    params: RequestParams = {},
  ) =>
    this.request<QcReferenceType, void>({
      path: `/api/v1/qc-reference-type`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceType
   * @name QcReferenceTypeControllerFindAll
   * @summary Get all qcReferenceTypes with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-reference-type
   * @secure
   */
  qcReferenceTypeControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcReferenceType[];
      },
      any
    >({
      path: `/api/v1/qc-reference-type`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceType
   * @name QcReferenceTypeControllerFindOne
   * @summary Get a qcReferenceType by id
   * @request GET:/api/v1/qc-reference-type/{id}
   * @secure
   */
  qcReferenceTypeControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<QcReferenceType, void>({
      path: `/api/v1/qc-reference-type/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceType
   * @name QcReferenceTypeControllerUpdate
   * @summary Update a qcReferenceType
   * @request PUT:/api/v1/qc-reference-type/{id}
   * @secure
   */
  qcReferenceTypeControllerUpdate = (
    id: string,
    data: UpdateQcReferenceTypeDto,
    params: RequestParams = {},
  ) =>
    this.request<QcReferenceType, void>({
      path: `/api/v1/qc-reference-type/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceType
   * @name QcReferenceTypeControllerRemove
   * @summary Delete a qcReferenceType
   * @request DELETE:/api/v1/qc-reference-type/{id}
   * @secure
   */
  qcReferenceTypeControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/qc-reference-type/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceValue
   * @name QcReferenceValueControllerCreate
   * @summary Create a new qcReferenceValue
   * @request POST:/api/v1/qc-reference-value
   * @secure
   */
  qcReferenceValueControllerCreate = (
    data: CreateQcReferenceValueDto,
    params: RequestParams = {},
  ) =>
    this.request<QcReferenceValue, void>({
      path: `/api/v1/qc-reference-value`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceValue
   * @name QcReferenceValueControllerFindAll
   * @summary Get all qcReferenceValues with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-reference-value
   * @secure
   */
  qcReferenceValueControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcReferenceValue[];
      },
      any
    >({
      path: `/api/v1/qc-reference-value`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceValue
   * @name QcReferenceValueControllerFindOne
   * @summary Get a qcReferenceValue by id
   * @request GET:/api/v1/qc-reference-value/{id}
   * @secure
   */
  qcReferenceValueControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<QcReferenceValue, void>({
      path: `/api/v1/qc-reference-value/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceValue
   * @name QcReferenceValueControllerUpdate
   * @summary Update a qcReferenceValue
   * @request PUT:/api/v1/qc-reference-value/{id}
   * @secure
   */
  qcReferenceValueControllerUpdate = (
    id: string,
    data: UpdateQcReferenceValueDto,
    params: RequestParams = {},
  ) =>
    this.request<QcReferenceValue, void>({
      path: `/api/v1/qc-reference-value/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceValue
   * @name QcReferenceValueControllerRemove
   * @summary Delete a qcReferenceValue
   * @request DELETE:/api/v1/qc-reference-value/{id}
   * @secure
   */
  qcReferenceValueControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/qc-reference-value/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceValueType
   * @name QcReferenceValueTypeControllerCreate
   * @summary Create a new qcReferenceValueType
   * @request POST:/api/v1/qc-reference-value-type
   * @secure
   */
  qcReferenceValueTypeControllerCreate = (
    data: CreateQcReferenceValueTypeDto,
    params: RequestParams = {},
  ) =>
    this.request<QcReferenceValueType, void>({
      path: `/api/v1/qc-reference-value-type`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceValueType
   * @name QcReferenceValueTypeControllerFindAll
   * @summary Get all qcReferenceValueTypes with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-reference-value-type
   * @secure
   */
  qcReferenceValueTypeControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcReferenceValueType[];
      },
      any
    >({
      path: `/api/v1/qc-reference-value-type`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceValueType
   * @name QcReferenceValueTypeControllerFindOne
   * @summary Get a qcReferenceValueType by id
   * @request GET:/api/v1/qc-reference-value-type/{id}
   * @secure
   */
  qcReferenceValueTypeControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<QcReferenceValueType, void>({
      path: `/api/v1/qc-reference-value-type/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceValueType
   * @name QcReferenceValueTypeControllerUpdate
   * @summary Update a qcReferenceValueType
   * @request PUT:/api/v1/qc-reference-value-type/{id}
   * @secure
   */
  qcReferenceValueTypeControllerUpdate = (
    id: string,
    data: UpdateQcReferenceValueTypeDto,
    params: RequestParams = {},
  ) =>
    this.request<QcReferenceValueType, void>({
      path: `/api/v1/qc-reference-value-type/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcReferenceValueType
   * @name QcReferenceValueTypeControllerRemove
   * @summary Delete a qcReferenceValueType
   * @request DELETE:/api/v1/qc-reference-value-type/{id}
   * @secure
   */
  qcReferenceValueTypeControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/qc-reference-value-type/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcRule
   * @name QcRuleControllerCreate
   * @summary Create a new qcRule
   * @request POST:/api/v1/qc-rule
   * @secure
   */
  qcRuleControllerCreate = (
    data: CreateQcRuleDto,
    params: RequestParams = {},
  ) =>
    this.request<QcRule, void>({
      path: `/api/v1/qc-rule`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcRule
   * @name QcRuleControllerFindAll
   * @summary Get all qcRules with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-rule
   * @secure
   */
  qcRuleControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcRule[];
      },
      any
    >({
      path: `/api/v1/qc-rule`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcRule
   * @name QcRuleControllerFindOne
   * @summary Get a qcRule by id
   * @request GET:/api/v1/qc-rule/{id}
   * @secure
   */
  qcRuleControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<QcRule, void>({
      path: `/api/v1/qc-rule/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcRule
   * @name QcRuleControllerUpdate
   * @summary Update a qcRule
   * @request PUT:/api/v1/qc-rule/{id}
   * @secure
   */
  qcRuleControllerUpdate = (
    id: string,
    data: UpdateQcRuleDto,
    params: RequestParams = {},
  ) =>
    this.request<QcRule, void>({
      path: `/api/v1/qc-rule/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcRule
   * @name QcRuleControllerRemove
   * @summary Delete a qcRule
   * @request DELETE:/api/v1/qc-rule/{id}
   * @secure
   */
  qcRuleControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/qc-rule/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcStatisticalLimits
   * @name QcStatisticalLimitsControllerCreate
   * @summary Create a new qcStatisticalLimits
   * @request POST:/api/v1/qc-statistical-limits
   * @secure
   */
  qcStatisticalLimitsControllerCreate = (
    data: CreateQcStatisticalLimitsDto,
    params: RequestParams = {},
  ) =>
    this.request<QcStatisticalLimits, void>({
      path: `/api/v1/qc-statistical-limits`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcStatisticalLimits
   * @name QcStatisticalLimitsControllerFindAll
   * @summary Get all qcStatisticalLimitss with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-statistical-limits
   * @secure
   */
  qcStatisticalLimitsControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcStatisticalLimits[];
      },
      any
    >({
      path: `/api/v1/qc-statistical-limits`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcStatisticalLimits
   * @name QcStatisticalLimitsControllerFindOne
   * @summary Get a qcStatisticalLimits by id
   * @request GET:/api/v1/qc-statistical-limits/{id}
   * @secure
   */
  qcStatisticalLimitsControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<QcStatisticalLimits, void>({
      path: `/api/v1/qc-statistical-limits/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcStatisticalLimits
   * @name QcStatisticalLimitsControllerUpdate
   * @summary Update a qcStatisticalLimits
   * @request PUT:/api/v1/qc-statistical-limits/{id}
   * @secure
   */
  qcStatisticalLimitsControllerUpdate = (
    id: string,
    data: UpdateQcStatisticalLimitsDto,
    params: RequestParams = {},
  ) =>
    this.request<QcStatisticalLimits, void>({
      path: `/api/v1/qc-statistical-limits/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcStatisticalLimits
   * @name QcStatisticalLimitsControllerRemove
   * @summary Delete a qcStatisticalLimits
   * @request DELETE:/api/v1/qc-statistical-limits/{id}
   * @secure
   */
  qcStatisticalLimitsControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/qc-statistical-limits/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags qcType
   * @name QcTypeControllerCreate
   * @summary Create a new qcType
   * @request POST:/api/v1/qc-type
   * @secure
   */
  qcTypeControllerCreate = (
    data: CreateQcTypeDto,
    params: RequestParams = {},
  ) =>
    this.request<QcType, void>({
      path: `/api/v1/qc-type`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcType
   * @name QcTypeControllerFindAll
   * @summary Get all qcTypes with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/qc-type
   * @secure
   */
  qcTypeControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: QcType[];
      },
      any
    >({
      path: `/api/v1/qc-type`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcType
   * @name QcTypeControllerFindOne
   * @summary Get a qcType by id
   * @request GET:/api/v1/qc-type/{id}
   * @secure
   */
  qcTypeControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<QcType, void>({
      path: `/api/v1/qc-type/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcType
   * @name QcTypeControllerUpdate
   * @summary Update a qcType
   * @request PUT:/api/v1/qc-type/{id}
   * @secure
   */
  qcTypeControllerUpdate = (
    id: string,
    data: UpdateQcTypeDto,
    params: RequestParams = {},
  ) =>
    this.request<QcType, void>({
      path: `/api/v1/qc-type/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags qcType
   * @name QcTypeControllerRemove
   * @summary Delete a qcType
   * @request DELETE:/api/v1/qc-type/{id}
   * @secure
   */
  qcTypeControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/qc-type/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags assay
   * @name AssayControllerCreate
   * @summary Create a new assay
   * @request POST:/api/v1/assay
   * @secure
   */
  assayControllerCreate = (data: CreateAssayDto, params: RequestParams = {}) =>
    this.request<Assay, void>({
      path: `/api/v1/assay`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assay
   * @name AssayControllerFindAll
   * @summary Get all assays with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/assay
   * @secure
   */
  assayControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Assay[];
      },
      any
    >({
      path: `/api/v1/assay`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assay
   * @name AssayControllerFindOne
   * @summary Get a assay by id
   * @request GET:/api/v1/assay/{id}
   * @secure
   */
  assayControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Assay, void>({
      path: `/api/v1/assay/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assay
   * @name AssayControllerUpdate
   * @summary Update a assay
   * @request PUT:/api/v1/assay/{id}
   * @secure
   */
  assayControllerUpdate = (
    id: string,
    data: UpdateAssayDto,
    params: RequestParams = {},
  ) =>
    this.request<Assay, void>({
      path: `/api/v1/assay/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags assay
   * @name AssayControllerRemove
   * @summary Delete a assay
   * @request DELETE:/api/v1/assay/{id}
   * @secure
   */
  assayControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/assay/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags pivotedAssayResults
   * @name PivotedAssayResultsControllerCreate
   * @summary Create a new pivotedAssayResults
   * @request POST:/api/v1/pivoted-assay-results
   * @secure
   */
  pivotedAssayResultsControllerCreate = (
    data: CreatePivotedAssayResultsDto,
    params: RequestParams = {},
  ) =>
    this.request<PivotedAssayResults, void>({
      path: `/api/v1/pivoted-assay-results`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pivotedAssayResults
   * @name PivotedAssayResultsControllerFindAll
   * @summary Get all pivotedAssayResultss with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pivoted-assay-results
   * @secure
   */
  pivotedAssayResultsControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: PivotedAssayResults[];
      },
      any
    >({
      path: `/api/v1/pivoted-assay-results`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pivotedAssayResults
   * @name PivotedAssayResultsControllerFindOne
   * @summary Get a pivotedAssayResults by id
   * @request GET:/api/v1/pivoted-assay-results/{id}
   * @secure
   */
  pivotedAssayResultsControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<PivotedAssayResults, void>({
      path: `/api/v1/pivoted-assay-results/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pivotedAssayResults
   * @name PivotedAssayResultsControllerUpdate
   * @summary Update a pivotedAssayResults
   * @request PUT:/api/v1/pivoted-assay-results/{id}
   * @secure
   */
  pivotedAssayResultsControllerUpdate = (
    id: string,
    data: UpdatePivotedAssayResultsDto,
    params: RequestParams = {},
  ) =>
    this.request<PivotedAssayResults, void>({
      path: `/api/v1/pivoted-assay-results/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pivotedAssayResults
   * @name PivotedAssayResultsControllerRemove
   * @summary Delete a pivotedAssayResults
   * @request DELETE:/api/v1/pivoted-assay-results/{id}
   * @secure
   */
  pivotedAssayResultsControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/pivoted-assay-results/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags pivotedXrfResult
   * @name PivotedXrfResultControllerCreate
   * @summary Create a new pivotedXrfResult
   * @request POST:/api/v1/pivoted-xrf-result
   * @secure
   */
  pivotedXrfResultControllerCreate = (
    data: CreatePivotedXrfResultDto,
    params: RequestParams = {},
  ) =>
    this.request<PivotedXrfResult, void>({
      path: `/api/v1/pivoted-xrf-result`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pivotedXrfResult
   * @name PivotedXrfResultControllerFindAll
   * @summary Get all pivotedXrfResults with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pivoted-xrf-result
   * @secure
   */
  pivotedXrfResultControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: PivotedXrfResult[];
      },
      any
    >({
      path: `/api/v1/pivoted-xrf-result`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pivotedXrfResult
   * @name PivotedXrfResultControllerFindOne
   * @summary Get a pivotedXrfResult by id
   * @request GET:/api/v1/pivoted-xrf-result/{id}
   * @secure
   */
  pivotedXrfResultControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<PivotedXrfResult, void>({
      path: `/api/v1/pivoted-xrf-result/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pivotedXrfResult
   * @name PivotedXrfResultControllerUpdate
   * @summary Update a pivotedXrfResult
   * @request PUT:/api/v1/pivoted-xrf-result/{id}
   * @secure
   */
  pivotedXrfResultControllerUpdate = (
    id: string,
    data: UpdatePivotedXrfResultDto,
    params: RequestParams = {},
  ) =>
    this.request<PivotedXrfResult, void>({
      path: `/api/v1/pivoted-xrf-result/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pivotedXrfResult
   * @name PivotedXrfResultControllerRemove
   * @summary Delete a pivotedXrfResult
   * @request DELETE:/api/v1/pivoted-xrf-result/{id}
   * @secure
   */
  pivotedXrfResultControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/pivoted-xrf-result/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags xrf
   * @name XrfControllerCreate
   * @summary Create a new xrf
   * @request POST:/api/v1/xrf
   * @secure
   */
  xrfControllerCreate = (data: CreateXrfDto, params: RequestParams = {}) =>
    this.request<Xrf, void>({
      path: `/api/v1/xrf`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrf
   * @name XrfControllerFindAll
   * @summary Get all xrfs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/xrf
   * @secure
   */
  xrfControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Xrf[];
      },
      any
    >({
      path: `/api/v1/xrf`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrf
   * @name XrfControllerFindOne
   * @summary Get a xrf by id
   * @request GET:/api/v1/xrf/{id}
   * @secure
   */
  xrfControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Xrf, void>({
      path: `/api/v1/xrf/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrf
   * @name XrfControllerUpdate
   * @summary Update a xrf
   * @request PUT:/api/v1/xrf/{id}
   * @secure
   */
  xrfControllerUpdate = (
    id: string,
    data: UpdateXrfDto,
    params: RequestParams = {},
  ) =>
    this.request<Xrf, void>({
      path: `/api/v1/xrf/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrf
   * @name XrfControllerRemove
   * @summary Delete a xrf
   * @request DELETE:/api/v1/xrf/{id}
   * @secure
   */
  xrfControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/xrf/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfHeader
   * @name XrfHeaderControllerCreate
   * @summary Create a new xrfHeader
   * @request POST:/api/v1/xrf-header
   * @secure
   */
  xrfHeaderControllerCreate = (
    data: CreateXrfHeaderDto,
    params: RequestParams = {},
  ) =>
    this.request<XrfHeader, void>({
      path: `/api/v1/xrf-header`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfHeader
   * @name XrfHeaderControllerFindAll
   * @summary Get all xrfHeaders with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/xrf-header
   * @secure
   */
  xrfHeaderControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: XrfHeader[];
      },
      any
    >({
      path: `/api/v1/xrf-header`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfHeader
   * @name XrfHeaderControllerFindOne
   * @summary Get a xrfHeader by id
   * @request GET:/api/v1/xrf-header/{id}
   * @secure
   */
  xrfHeaderControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<XrfHeader, void>({
      path: `/api/v1/xrf-header/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfHeader
   * @name XrfHeaderControllerUpdate
   * @summary Update a xrfHeader
   * @request PUT:/api/v1/xrf-header/{id}
   * @secure
   */
  xrfHeaderControllerUpdate = (
    id: string,
    data: UpdateXrfHeaderDto,
    params: RequestParams = {},
  ) =>
    this.request<XrfHeader, void>({
      path: `/api/v1/xrf-header/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags xrfHeader
   * @name XrfHeaderControllerRemove
   * @summary Delete a xrfHeader
   * @request DELETE:/api/v1/xrf-header/{id}
   * @secure
   */
  xrfHeaderControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/xrf-header/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags vwQuickDrillPlan
   * @name VwQuickDrillPlanControllerCreate
   * @summary Create a new vwQuickDrillPlan
   * @request POST:/api/v1/vw-quick-drill-plan
   * @secure
   */
  vwQuickDrillPlanControllerCreate = (
    data: CreateVwQuickDrillPlanDto,
    params: RequestParams = {},
  ) =>
    this.request<VwQuickDrillPlan, void>({
      path: `/api/v1/vw-quick-drill-plan`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwQuickDrillPlan
   * @name VwQuickDrillPlanControllerFindAll
   * @summary Get all vwQuickDrillPlans with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/vw-quick-drill-plan
   * @secure
   */
  vwQuickDrillPlanControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: VwQuickDrillPlan[];
      },
      any
    >({
      path: `/api/v1/vw-quick-drill-plan`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwQuickDrillPlan
   * @name VwQuickDrillPlanControllerFindOne
   * @summary Get a vwQuickDrillPlan by id
   * @request GET:/api/v1/vw-quick-drill-plan/{id}
   * @secure
   */
  vwQuickDrillPlanControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<VwQuickDrillPlan, void>({
      path: `/api/v1/vw-quick-drill-plan/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwQuickDrillPlan
   * @name VwQuickDrillPlanControllerUpdate
   * @summary Update a vwQuickDrillPlan
   * @request PUT:/api/v1/vw-quick-drill-plan/{id}
   * @secure
   */
  vwQuickDrillPlanControllerUpdate = (
    id: string,
    data: UpdateVwQuickDrillPlanDto,
    params: RequestParams = {},
  ) =>
    this.request<VwQuickDrillPlan, void>({
      path: `/api/v1/vw-quick-drill-plan/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwQuickDrillPlan
   * @name VwQuickDrillPlanControllerRemove
   * @summary Delete a vwQuickDrillPlan
   * @request DELETE:/api/v1/vw-quick-drill-plan/{id}
   * @secure
   */
  vwQuickDrillPlanControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/vw-quick-drill-plan/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags vwCollar
   * @name VwCollarControllerCreate
   * @summary Create a new vwCollar
   * @request POST:/api/v1/vw-collar
   * @secure
   */
  vwCollarControllerCreate = (
    data: CreateVwCollarDto,
    params: RequestParams = {},
  ) =>
    this.request<VwCollar, void>({
      path: `/api/v1/vw-collar`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwCollar
   * @name VwCollarControllerFindAll
   * @summary Get all vwCollars with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/vw-collar
   * @secure
   */
  vwCollarControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: VwCollar[];
      },
      any
    >({
      path: `/api/v1/vw-collar`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwCollar
   * @name VwCollarControllerFindOne
   * @summary Get a vwCollar by id
   * @request GET:/api/v1/vw-collar/{id}
   * @secure
   */
  vwCollarControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<VwCollar, void>({
      path: `/api/v1/vw-collar/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwCollar
   * @name VwCollarControllerUpdate
   * @summary Update a vwCollar
   * @request PUT:/api/v1/vw-collar/{id}
   * @secure
   */
  vwCollarControllerUpdate = (
    id: string,
    data: UpdateVwCollarDto,
    params: RequestParams = {},
  ) =>
    this.request<VwCollar, void>({
      path: `/api/v1/vw-collar/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwCollar
   * @name VwCollarControllerRemove
   * @summary Delete a vwCollar
   * @request DELETE:/api/v1/vw-collar/{id}
   * @secure
   */
  vwCollarControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/vw-collar/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags vwQuickDrillHole
   * @name VwQuickDrillHoleControllerCreate
   * @summary Create a new vwQuickDrillHole
   * @request POST:/api/v1/vw-quick-drill-hole
   * @secure
   */
  vwQuickDrillHoleControllerCreate = (
    data: CreateVwQuickDrillHoleDto,
    params: RequestParams = {},
  ) =>
    this.request<VwQuickDrillHole, void>({
      path: `/api/v1/vw-quick-drill-hole`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwQuickDrillHole
   * @name VwQuickDrillHoleControllerFindAll
   * @summary Get all vwQuickDrillHoles with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/vw-quick-drill-hole
   * @secure
   */
  vwQuickDrillHoleControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: VwQuickDrillHole[];
      },
      any
    >({
      path: `/api/v1/vw-quick-drill-hole`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwQuickDrillHole
   * @name VwQuickDrillHoleControllerFindOne
   * @summary Get a vwQuickDrillHole by id
   * @request GET:/api/v1/vw-quick-drill-hole/{id}
   * @secure
   */
  vwQuickDrillHoleControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<VwQuickDrillHole, void>({
      path: `/api/v1/vw-quick-drill-hole/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwQuickDrillHole
   * @name VwQuickDrillHoleControllerUpdate
   * @summary Update a vwQuickDrillHole
   * @request PUT:/api/v1/vw-quick-drill-hole/{id}
   * @secure
   */
  vwQuickDrillHoleControllerUpdate = (
    id: string,
    data: UpdateVwQuickDrillHoleDto,
    params: RequestParams = {},
  ) =>
    this.request<VwQuickDrillHole, void>({
      path: `/api/v1/vw-quick-drill-hole/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwQuickDrillHole
   * @name VwQuickDrillHoleControllerRemove
   * @summary Delete a vwQuickDrillHole
   * @request DELETE:/api/v1/vw-quick-drill-hole/{id}
   * @secure
   */
  vwQuickDrillHoleControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/vw-quick-drill-hole/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags vwDrillPlan
   * @name VwDrillPlanControllerCreate
   * @summary Create a new vwDrillPlan
   * @request POST:/api/v1/vw-drill-plan
   * @secure
   */
  vwDrillPlanControllerCreate = (
    data: CreateVwDrillPlanDto,
    params: RequestParams = {},
  ) =>
    this.request<VwDrillPlan, void>({
      path: `/api/v1/vw-drill-plan`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwDrillPlan
   * @name VwDrillPlanControllerFindAll
   * @summary Get all vwDrillPlans with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/vw-drill-plan
   * @secure
   */
  vwDrillPlanControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: VwDrillPlan[];
      },
      any
    >({
      path: `/api/v1/vw-drill-plan`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwDrillPlan
   * @name VwDrillPlanControllerFindOne
   * @summary Get a vwDrillPlan by id
   * @request GET:/api/v1/vw-drill-plan/{id}
   * @secure
   */
  vwDrillPlanControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<VwDrillPlan, void>({
      path: `/api/v1/vw-drill-plan/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwDrillPlan
   * @name VwDrillPlanControllerUpdate
   * @summary Update a vwDrillPlan
   * @request PUT:/api/v1/vw-drill-plan/{id}
   * @secure
   */
  vwDrillPlanControllerUpdate = (
    id: string,
    data: UpdateVwDrillPlanDto,
    params: RequestParams = {},
  ) =>
    this.request<VwDrillPlan, void>({
      path: `/api/v1/vw-drill-plan/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags vwDrillPlan
   * @name VwDrillPlanControllerRemove
   * @summary Delete a vwDrillPlan
   * @request DELETE:/api/v1/vw-drill-plan/{id}
   * @secure
   */
  vwDrillPlanControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/vw-drill-plan/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags uiDrillHole
   * @name UiDrillHoleControllerFindAll
   * @summary Get all uiDrillHoles with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/ui-drill-hole
   * @secure
   */
  uiDrillHoleControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: UiDrillHole[];
      },
      any
    >({
      path: `/api/v1/ui-drill-hole`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags uiDrillHole
   * @name UiDrillHoleControllerFindOne
   * @summary Get a uiDrillHole by id
   * @request GET:/api/v1/ui-drill-hole/{id}
   * @secure
   */
  uiDrillHoleControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<UiDrillHole, void>({
      path: `/api/v1/ui-drill-hole/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags uiDrillHole
   * @name UiDrillHoleControllerUpdate
   * @summary Update a uiDrillHole
   * @request PUT:/api/v1/ui-drill-hole/{id}
   * @secure
   */
  uiDrillHoleControllerUpdate = (
    id: string,
    data: UpdateUiDrillHoleDto,
    params: RequestParams = {},
  ) =>
    this.request<UiDrillHole, void>({
      path: `/api/v1/ui-drill-hole/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags uiDrillHole
   * @name UiDrillHoleControllerRemove
   * @summary Delete a uiDrillHole
   * @request DELETE:/api/v1/ui-drill-hole/{id}
   * @secure
   */
  uiDrillHoleControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/ui-drill-hole/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags uiDrillHole
   * @name UiDrillHoleControllerGetSectionVersion
   * @summary Get section version information for an entity
   * @request GET:/api/v1/ui-drill-hole/section-version/{entityId}
   * @secure
   */
  uiDrillHoleControllerGetSectionVersion = (
    entityId: string,
    params: RequestParams = {},
  ) =>
    this.request<SectionVersionDto[], void>({
      path: `/api/v1/ui-drill-hole/section-version/${entityId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags uiAllSamples
   * @name UiAllSamplesControllerCreate
   * @summary Create a new uiAllSamples
   * @request POST:/api/v1/ui-all-samples
   * @secure
   */
  uiAllSamplesControllerCreate = (
    data: CreateUiAllSamplesDto,
    params: RequestParams = {},
  ) =>
    this.request<UiAllSamples, void>({
      path: `/api/v1/ui-all-samples`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags uiAllSamples
   * @name UiAllSamplesControllerFindAll
   * @summary Get all uiAllSampless with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/ui-all-samples
   * @secure
   */
  uiAllSamplesControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: UiAllSamples[];
      },
      any
    >({
      path: `/api/v1/ui-all-samples`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags uiAllSamples
   * @name UiAllSamplesControllerFindOne
   * @summary Get a uiAllSamples by id
   * @request GET:/api/v1/ui-all-samples/{id}
   * @secure
   */
  uiAllSamplesControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<UiAllSamples, void>({
      path: `/api/v1/ui-all-samples/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags uiAllSamples
   * @name UiAllSamplesControllerUpdate
   * @summary Update a uiAllSamples
   * @request PUT:/api/v1/ui-all-samples/{id}
   * @secure
   */
  uiAllSamplesControllerUpdate = (
    id: string,
    data: UpdateUiAllSamplesDto,
    params: RequestParams = {},
  ) =>
    this.request<UiAllSamples, void>({
      path: `/api/v1/ui-all-samples/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags uiAllSamples
   * @name UiAllSamplesControllerRemove
   * @summary Delete a uiAllSamples
   * @request DELETE:/api/v1/ui-all-samples/{id}
   * @secure
   */
  uiAllSamplesControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/ui-all-samples/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description Returns all QAQC insertion rules for the specified laboratory code
   *
   * @tags Custom QAQC Insertion Rules
   * @name QaqcInsertionRulesControllerFindByLaboratory
   * @summary Fetch QAQC insertion rules by laboratory
   * @request GET:/api/v1/api/qaqc-insertion-rules/{laboratory}
   * @secure
   */
  qaqcInsertionRulesControllerFindByLaboratory = (
    laboratory: string,
    query?: {
      /** Include inactive rules in results (default: false) */
      includeInactive?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<QcInsertionRule[], void>({
      path: `/api/v1/api/qaqc-insertion-rules/${laboratory}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Creates a new quality control sample insertion rule for a laboratory
   *
   * @tags Custom QAQC Insertion Rules
   * @name QaqcInsertionRulesControllerCreate
   * @summary Create new QAQC insertion rule
   * @request POST:/api/v1/api/qaqc-insertion-rules
   * @secure
   */
  qaqcInsertionRulesControllerCreate = (
    data: CreateQcInsertionRuleDto,
    params: RequestParams = {},
  ) =>
    this.request<QcInsertionRule, void>({
      path: `/api/v1/api/qaqc-insertion-rules`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Updates an existing quality control sample insertion rule
   *
   * @tags Custom QAQC Insertion Rules
   * @name QaqcInsertionRulesControllerUpdate
   * @summary Update QAQC insertion rule
   * @request PUT:/api/v1/api/qaqc-insertion-rules/{id}
   * @secure
   */
  qaqcInsertionRulesControllerUpdate = (
    id: string,
    data: UpdateQcInsertionRuleDto,
    params: RequestParams = {},
  ) =>
    this.request<QcInsertionRule, void>({
      path: `/api/v1/api/qaqc-insertion-rules/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Executes QAQC.sp_CalculateDuplicateRSD to calculate Relative Percent Difference (RPD) and Relative Standard Deviation (RSD) for duplicate samples. Returns base columns plus dynamic element-specific columns: - Base columns: DuplicateSampleId, OriginalSampleId, SampledDt, LabCode, BatchNo - Dynamic columns: {Element}_RPD, {Element}_RSD, {Element}_OriginalValue, {Element}_DuplicateValue for each element Used for: - Duplicate QC performance assessment - Precision monitoring by element - Lab precision comparison - Batch precision validation
   *
   * @tags QAQC - Duplicate Precision
   * @name SpCalculateDuplicateRsdControllerExecute
   * @summary Calculate duplicate precision metrics (RPD/RSD)
   * @request POST:/api/v1/sp-calculate-duplicate-rsd/execute
   * @secure
   */
  spCalculateDuplicateRsdControllerExecute = (
    data: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<SpCalculateDuplicateRsd[], any>({
      path: `/api/v1/sp-calculate-duplicate-rsd/execute`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Executes QAQC.sp_CalculateDuplicateRSD with pagination support. Use query parameters to filter results.
   *
   * @tags QAQC - Duplicate Precision
   * @name SpCalculateDuplicateRsdControllerFindAll
   * @summary Calculate duplicate precision metrics with pagination
   * @request GET:/api/v1/sp-calculate-duplicate-rsd
   * @secure
   */
  spCalculateDuplicateRsdControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<SpCalculateDuplicateRsd[], any>({
      path: `/api/v1/sp-calculate-duplicate-rsd`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Executes QAQC.sp_GetGradeRange to retrieve grade range classifications. Grade ranges define: - Low/Medium/High grade bins for elements - Grade-based QC acceptance criteria - Element-specific thresholds Used for: - QC filtering by sample grade - Duplicate acceptance criteria (grade-dependent RPD thresholds) - Detection limit configurations - Grade-based reporting
   *
   * @tags QAQC - Grade Ranges
   * @name SpGetGradeRangeControllerExecute
   * @summary Get grade range classifications
   * @request POST:/api/v1/sp-get-grade-range/execute
   * @secure
   */
  spGetGradeRangeControllerExecute = (
    data: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<SpGetGradeRange[], any>({
      path: `/api/v1/sp-get-grade-range/execute`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Executes QAQC.sp_GetGradeRange with pagination support. Use query parameters to filter results.
   *
   * @tags QAQC - Grade Ranges
   * @name SpGetGradeRangeControllerFindAll
   * @summary Get grade range classifications with pagination
   * @request GET:/api/v1/sp-get-grade-range
   * @secure
   */
  spGetGradeRangeControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<SpGetGradeRange[], any>({
      path: `/api/v1/sp-get-grade-range`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieves only currently active grade ranges for the specified element based on EffectiveDt and ExpiryDt.
   *
   * @tags QAQC - Grade Ranges
   * @name SpGetGradeRangeControllerGetActiveRanges
   * @summary Get active grade ranges for an element
   * @request GET:/api/v1/sp-get-grade-range/active/{element}
   * @secure
   */
  spGetGradeRangeControllerGetActiveRanges = (
    element: string,
    query?: {
      /** Optional lab code filter */
      labCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SpGetGradeRange[], any>({
      path: `/api/v1/sp-get-grade-range/active/${element}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Determines which grade range (Low/Medium/High) a specific assay value falls into for an element.
   *
   * @tags QAQC - Grade Ranges
   * @name SpGetGradeRangeControllerClassifyGrade
   * @summary Classify a grade value into its range
   * @request GET:/api/v1/sp-get-grade-range/classify/{element}/{value}
   * @secure
   */
  spGetGradeRangeControllerClassifyGrade = (
    element: string,
    value: number,
    query?: {
      /** Optional lab code filter */
      labCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<SpGetGradeRange, void>({
      path: `/api/v1/sp-get-grade-range/classify/${element}/${value}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags spGetHoleValidation
   * @name SpGetHoleValidationControllerFindAll
   * @summary Execute sp_GetHoleValidation stored procedure with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sp-get-hole-validation
   * @secure
   */
  spGetHoleValidationControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: SpGetHoleValidation[];
      },
      any
    >({
      path: `/api/v1/sp-get-hole-validation`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags spGetHoleValidation
   * @name SpGetHoleValidationControllerFindAllRaw
   * @summary Execute sp_GetHoleValidation stored procedure and return all results
   * @request GET:/api/v1/sp-get-hole-validation/raw
   * @secure
   */
  spGetHoleValidationControllerFindAllRaw = (params: RequestParams = {}) =>
    this.request<SpGetHoleValidation[], any>({
      path: `/api/v1/sp-get-hole-validation/raw`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieves aggregated QC metrics for dashboard visualization. **Returns Two Result Sets:** 1. **Time Series Data:** - QC metrics aggregated by period (daily/weekly/monthly/batch) - Grouped by element and QC type - Includes failure rates, Z-Scores (standards), RPD (duplicates), blank values 2. **Summary Statistics:** - Overall QC sample count - Average failure rate - Average Z-Score for standards - Average RPD for duplicates - Number of active labs - Number of elements tested - Date range information **Aggregation Levels:** - `DAILY`: Aggregate by calendar day - `WEEKLY`: Aggregate by week (Monday start) - `MONTHLY`: Aggregate by calendar month - `BATCH`: Aggregate by lab batch number **Use Cases:** - Executive QC dashboards - Laboratory performance monitoring - Trend analysis over time - Multi-lab comparison - Element-specific QC tracking **Metrics Included:** - Pass/Warn/Fail counts - Failure rate percentages - Z-Score statistics (for standards) - RPD statistics (for duplicates) - Blank contamination levels
   *
   * @tags QAQC - Global Dashboard
   * @name SpGlobalDashboardControllerExecute
   * @summary Get global QAQC dashboard data
   * @request POST:/api/v1/qaqc/global-dashboard
   * @secure
   */
  spGlobalDashboardControllerExecute = (
    data: SpGlobalDashboardRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<SpGlobalDashboardResponseDto, void>({
      path: `/api/v1/qaqc/global-dashboard`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags spGetHoleValidationEnhanced
   * @name SpGetHoleValidationEnhancedControllerFindAll
   * @summary Execute sp_GetHoleValidation_Enhanced stored procedure with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/sp-get-hole-validation-enhanced
   * @secure
   */
  spGetHoleValidationEnhancedControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: SpGetHoleValidationEnhanced[];
      },
      any
    >({
      path: `/api/v1/sp-get-hole-validation-enhanced`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags spGetHoleValidationEnhanced
   * @name SpGetHoleValidationEnhancedControllerFindAllRaw
   * @summary Execute sp_GetHoleValidation_Enhanced stored procedure and return all results
   * @request GET:/api/v1/sp-get-hole-validation-enhanced/raw
   * @secure
   */
  spGetHoleValidationEnhancedControllerFindAllRaw = (
    params: RequestParams = {},
  ) =>
    this.request<SpGetHoleValidationEnhanced[], any>({
      path: `/api/v1/sp-get-hole-validation-enhanced/raw`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Executes sp_GetGlobalCharts to retrieve three types of QAQC chart data: **Result Set 1: Shewhart Control Chart Data** - Standards measurements with control limits (UCL, UWL, LWL, LCL) - Control status monitoring (In Control, Warning, Out of Control) - Time series data for quality control charts **Result Set 2: Duplicate Correlation Data** - Original vs. duplicate sample values - Precision metrics (absolute and relative differences) - Scatter plot data for duplicate analysis **Result Set 3: Bias Trend Data** - Monthly bias aggregations by laboratory - Average bias, standard deviation, and sample counts - Trend analysis for laboratory performance monitoring **Parameters:** - StartDate/EndDate: Define the analysis period (required) - StandardId: Filter by specific standard reference (optional) - Element: Chemical element to analyze (default: Au - Gold) - LabCode: Filter by laboratory code (optional)
   *
   * @tags QAQC - Global Charts
   * @name SpGetGlobalChartsControllerExecute
   * @summary Get comprehensive QAQC charts data
   * @request POST:/api/v1/qaqc/global-charts
   * @secure
   */
  spGetGlobalChartsControllerExecute = (
    data: SpGetGlobalChartsRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<SpGetGlobalChartsResponseDto, void>({
      path: `/api/v1/qaqc/global-charts`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Generates a unique dispatch number for a laboratory. **Dispatch Number Format:** - Pattern: {LabCode}_{Year}_{SequenceNo} - Example: ALS_2025_0001 - Sequence auto-increments for each lab/year combination **How It Works:** - Queries existing dispatch numbers for the lab and current year - Finds the maximum sequence number - Increments and returns new number - Thread-safe using database locks **When to Use:** - Typically called automatically by sp_CreateLabDispatch - Can be used for pre-generating numbers if needed - Useful for testing dispatch number formats **Important Notes:** - Each call generates a NEW unique number - Numbers are not reserved - use immediately - Gaps in sequence are possible if dispatch creation fails
   *
   * @tags Sample - Lab Dispatch Utilities
   * @name SpGenerateDispatchNumberControllerGenerate
   * @summary Generate unique dispatch number
   * @request POST:/api/v1/sample/lab-dispatch/generate-number
   * @secure
   */
  spGenerateDispatchNumberControllerGenerate = (
    data: GenerateDispatchNumberRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<GenerateDispatchNumberResponseDto, void>({
      path: `/api/v1/sample/lab-dispatch/generate-number`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Creates a new lab dispatch with auto-generated dispatch number. **Dispatch Number Format:** {LabCode}_{Year}_{SequenceNo} Example: ALS_2025_0001 **Transaction Behavior:** - Atomically creates dispatch record - Generates unique dispatch number using sequence - Returns row version for optimistic concurrency control - Rolls back on any error **Use Cases:** - Creating sample dispatch for laboratory submission - Tracking sample shipments to external labs - Managing drill hole sample logistics **Next Steps:** After creating a dispatch: 1. Use the returned `dispatchNumber` for tracking 2. Save the `rowVersion` for future updates 3. Add samples using POST /sample/dispatch/{id}/samples 4. Update status using PATCH /sample/dispatch/{id}/status
   *
   * @tags Sample - Lab Dispatch
   * @name SpCreateLabDispatchControllerCreate
   * @summary Create new lab dispatch
   * @request POST:/api/v1/sample/lab-dispatch
   * @secure
   */
  spCreateLabDispatchControllerCreate = (
    data: CreateLabDispatchRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<CreateLabDispatchResponseDto, void>({
      path: `/api/v1/sample/lab-dispatch`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Retrieves all lab dispatches for a specific drill hole/collar. **Response Structure:** Each dispatch includes: - Header information (dispatch number, status, dates, etc.) - Nested samples as JSON array (SamplesJson field) - Sample details (sample name, depths, weight, type, status) **Use Cases:** - View complete dispatch history for a drill hole - Track sample shipment status - Audit dispatch and sample tracking - Generate dispatch reports **Ordering:** Results are ordered by: 1. Dispatch date (descending - most recent first) 2. Created date (descending) **JSON Sub-query:** The `SamplesJson` field contains an array of samples: ```json { "SampleId": "...", "SampleNm": "...", "DepthFrom": 10.5, "DepthTo": 11.0, "SampleWeight": 2.5, "SampleType": "CORE", "DispatchSequence": 1, "DispatchStatus": "Pending" } ```
   *
   * @tags Sample - Lab Dispatch Queries
   * @name SpGetLabDispatchByCollarControllerGetByCollar
   * @summary Get lab dispatches by collar
   * @request POST:/api/v1/sample/lab-dispatch/by-collar
   * @secure
   */
  spGetLabDispatchByCollarControllerGetByCollar = (
    data: GetLabDispatchByCollarRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<SpGetLabDispatchByCollar[], void>({
      path: `/api/v1/sample/lab-dispatch/by-collar`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Updates lab dispatch status with optimistic concurrency control. **Optimistic Locking:** - Requires current row version to prevent concurrent updates - Returns new row version after successful update - Throws 409 Conflict if row version doesn't match **Status Workflow:** ``` Draft → Submitted → Received → Complete ↓         ↓         ↓ Cancelled (terminal) ``` **Validation Rules:** - Cannot modify completed dispatches - Some status transitions may be restricted - Lab received date is automatically set when status becomes 'Received' **Use Cases:** - Mark dispatch as submitted when ready to send - Update to received when lab confirms receipt - Mark as complete when analysis is finished - Cancel dispatch if no longer needed **After Status Update:** - Save the returned `newRowVersion` for next update - Dispatch may trigger automated notifications - Lab received date updates automatically
   *
   * @tags Sample - Lab Dispatch
   * @name SpUpdateLabDispatchStatusControllerUpdateStatus
   * @summary Update dispatch status
   * @request PATCH:/api/v1/sample/lab-dispatch/{id}/status
   * @secure
   */
  spUpdateLabDispatchStatusControllerUpdateStatus = (
    id: string,
    data: UpdateLabDispatchStatusRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateLabDispatchStatusResponseDto, void>({
      path: `/api/v1/sample/lab-dispatch/${id}/status`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Soft deletes a lab dispatch and all associated sample dispatches. **Soft Delete Behavior:** - Sets ActiveInd = 0 (marks as inactive) - Records remain in database for audit trail - Associated sample dispatches also soft deleted - Can potentially be restored by database administrator **Optimistic Locking:** - Requires current row version to prevent conflicts - Throws 409 Conflict if row version doesn't match - Prevents accidental deletion of modified records **What Gets Deleted:** - Lab dispatch record (soft deleted) - All associated sample dispatch records (soft deleted) - Sample tracking updated (dispatch count decremented) **Use Cases:** - Cancel a dispatch that was created in error - Remove draft dispatches no longer needed - Clean up test/duplicate dispatches **Important Notes:** - This is irreversible through the API (requires DB admin to restore) - Dispatch must not be in 'Complete' status - Associated samples are unaffected (only the dispatch linkage is removed)
   *
   * @tags Sample - Lab Dispatch
   * @name SpDeleteLabDispatchControllerDelete
   * @summary Soft delete lab dispatch
   * @request DELETE:/api/v1/sample/lab-dispatch/{id}
   * @secure
   */
  spDeleteLabDispatchControllerDelete = (
    id: string,
    data: DeleteLabDispatchRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/sample/lab-dispatch/${id}`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Retrieves samples from a drill hole that are eligible for dispatch to a laboratory. **Eligibility Criteria:** - Sample must be in 'Complete' status (RowStatus >= 1) - Sample must be active (not deleted) - Sample must belong to the specified collar/drill hole - Optionally: Sample has not been previously dispatched **Ordering:** Results are ordered by: 1. DepthFrom (ascending - shallowest first) 2. DepthTo (ascending) **Use Cases:** - Select samples for adding to a new dispatch - Identify which samples are ready for laboratory submission - Track sample processing workflow - Generate dispatch preparation lists **Include Already Dispatched:** - `false` (default): Only samples never dispatched or DispatchCount = 0 - `true`: All eligible samples, including previously dispatched ones **Response Fields:** - Sample details (ID, name, depths, weight, type) - Dispatch tracking (last dispatch date, dispatch count, dispatch number) - Sample status information **Typical Workflow:** 1. Call this endpoint to get eligible samples 2. User selects samples to dispatch 3. Create dispatch using POST /sample/lab-dispatch 4. Add selected samples using POST /sample/lab-dispatch/{id}/samples
   *
   * @tags Sample - Lab Dispatch Queries
   * @name SpGetSamplesForDispatchControllerGetEligibleSamples
   * @summary Get samples eligible for dispatch
   * @request POST:/api/v1/sample/lab-dispatch/eligible-samples
   * @secure
   */
  spGetSamplesForDispatchControllerGetEligibleSamples = (
    data: GetSamplesForDispatchRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<SpGetSamplesForDispatch[], void>({
      path: `/api/v1/sample/lab-dispatch/eligible-samples`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Bulk adds samples to an existing lab dispatch. **Transaction Behavior:** - All-or-nothing operation (atomic) - Validates all samples exist and are eligible - Updates dispatch totals automatically - Assigns dispatch sequence numbers - Rolls back on any error **Sample Eligibility:** - Sample must exist in database - Sample must be in 'Complete' status (RowStatus >= 1) - Sample can be dispatched multiple times if needed **Use Cases:** - Adding core samples to a dispatch for lab analysis - Bulk sample submission to external laboratories - Managing sample logistics and tracking **Input Format:** Comma-separated UUIDs without spaces: `660e8400-e29b-41d4-a716-446655440001,770e8400-e29b-41d4-a716-446655440002` **After Adding Samples:** - Samples are tracked with dispatch number - Dispatch totals are automatically updated - Sample dispatch history is maintained
   *
   * @tags Sample - Lab Dispatch
   * @name SpAddSamplesToDispatchControllerAddSamples
   * @summary Add samples to dispatch
   * @request POST:/api/v1/sample/lab-dispatch/{id}/samples
   * @secure
   */
  spAddSamplesToDispatchControllerAddSamples = (
    id: string,
    data: AddSamplesToDispatchRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/sample/lab-dispatch/${id}/samples`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags applicationLog
   * @name ApplicationLogControllerCreate
   * @summary Create a new applicationLog
   * @request POST:/api/v1/application-log
   * @secure
   */
  applicationLogControllerCreate = (
    data: CreateApplicationLogDto,
    params: RequestParams = {},
  ) =>
    this.request<ApplicationLog, void>({
      path: `/api/v1/application-log`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags applicationLog
   * @name ApplicationLogControllerFindAll
   * @summary Get all applicationLogs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/application-log
   * @secure
   */
  applicationLogControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: ApplicationLog[];
      },
      any
    >({
      path: `/api/v1/application-log`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags applicationLog
   * @name ApplicationLogControllerFindOne
   * @summary Get a applicationLog by id
   * @request GET:/api/v1/application-log/{id}
   * @secure
   */
  applicationLogControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<ApplicationLog, void>({
      path: `/api/v1/application-log/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags applicationLog
   * @name ApplicationLogControllerUpdate
   * @summary Update a applicationLog
   * @request PUT:/api/v1/application-log/{id}
   * @secure
   */
  applicationLogControllerUpdate = (
    id: string,
    data: UpdateApplicationLogDto,
    params: RequestParams = {},
  ) =>
    this.request<ApplicationLog, void>({
      path: `/api/v1/application-log/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags applicationLog
   * @name ApplicationLogControllerRemove
   * @summary Delete a applicationLog
   * @request DELETE:/api/v1/application-log/{id}
   * @secure
   */
  applicationLogControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/application-log/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags config
   * @name ConfigControllerCreate
   * @summary Create a new config
   * @request POST:/api/v1/config
   * @secure
   */
  configControllerCreate = (
    data: CreateConfigDto,
    params: RequestParams = {},
  ) =>
    this.request<Config, void>({
      path: `/api/v1/config`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags config
   * @name ConfigControllerFindAll
   * @summary Get all configs with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/config
   * @secure
   */
  configControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Config[];
      },
      any
    >({
      path: `/api/v1/config`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags config
   * @name ConfigControllerFindOne
   * @summary Get a config by id
   * @request GET:/api/v1/config/{id}
   * @secure
   */
  configControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Config, void>({
      path: `/api/v1/config/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags config
   * @name ConfigControllerUpdate
   * @summary Update a config
   * @request PUT:/api/v1/config/{id}
   * @secure
   */
  configControllerUpdate = (
    id: string,
    data: UpdateConfigDto,
    params: RequestParams = {},
  ) =>
    this.request<Config, void>({
      path: `/api/v1/config/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags config
   * @name ConfigControllerRemove
   * @summary Delete a config
   * @request DELETE:/api/v1/config/{id}
   * @secure
   */
  configControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/config/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags lookUpNormalization
   * @name LookUpNormalizationControllerCreate
   * @summary Create a new lookUpNormalization
   * @request POST:/api/v1/look-up-normalization
   * @secure
   */
  lookUpNormalizationControllerCreate = (
    data: CreateLookUpNormalizationDto,
    params: RequestParams = {},
  ) =>
    this.request<LookUpNormalization, void>({
      path: `/api/v1/look-up-normalization`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags lookUpNormalization
   * @name LookUpNormalizationControllerFindAll
   * @summary Get all lookUpNormalizations with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/look-up-normalization
   * @secure
   */
  lookUpNormalizationControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: LookUpNormalization[];
      },
      any
    >({
      path: `/api/v1/look-up-normalization`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags lookUpNormalization
   * @name LookUpNormalizationControllerFindOne
   * @summary Get a lookUpNormalization by id
   * @request GET:/api/v1/look-up-normalization/{id}
   * @secure
   */
  lookUpNormalizationControllerFindOne = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<LookUpNormalization, void>({
      path: `/api/v1/look-up-normalization/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags lookUpNormalization
   * @name LookUpNormalizationControllerUpdate
   * @summary Update a lookUpNormalization
   * @request PUT:/api/v1/look-up-normalization/{id}
   * @secure
   */
  lookUpNormalizationControllerUpdate = (
    id: string,
    data: UpdateLookUpNormalizationDto,
    params: RequestParams = {},
  ) =>
    this.request<LookUpNormalization, void>({
      path: `/api/v1/look-up-normalization/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags lookUpNormalization
   * @name LookUpNormalizationControllerRemove
   * @summary Delete a lookUpNormalization
   * @request DELETE:/api/v1/look-up-normalization/{id}
   * @secure
   */
  lookUpNormalizationControllerRemove = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/look-up-normalization/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags pickList
   * @name PickListControllerCreate
   * @summary Create a new pickList
   * @request POST:/api/v1/pick-list
   * @secure
   */
  pickListControllerCreate = (
    data: CreatePickListDto,
    params: RequestParams = {},
  ) =>
    this.request<PickList, void>({
      path: `/api/v1/pick-list`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pickList
   * @name PickListControllerFindAll
   * @summary Get all pickLists with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pick-list
   * @secure
   */
  pickListControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: PickList[];
      },
      any
    >({
      path: `/api/v1/pick-list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pickList
   * @name PickListControllerFindOne
   * @summary Get a pickList by id
   * @request GET:/api/v1/pick-list/{id}
   * @secure
   */
  pickListControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<PickList, void>({
      path: `/api/v1/pick-list/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pickList
   * @name PickListControllerUpdate
   * @summary Update a pickList
   * @request PUT:/api/v1/pick-list/{id}
   * @secure
   */
  pickListControllerUpdate = (
    id: string,
    data: UpdatePickListDto,
    params: RequestParams = {},
  ) =>
    this.request<PickList, void>({
      path: `/api/v1/pick-list/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pickList
   * @name PickListControllerRemove
   * @summary Delete a pickList
   * @request DELETE:/api/v1/pick-list/{id}
   * @secure
   */
  pickListControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/pick-list/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags pickListUser
   * @name PickListUserControllerCreate
   * @summary Create a new pickListUser
   * @request POST:/api/v1/pick-list-user
   * @secure
   */
  pickListUserControllerCreate = (
    data: CreatePickListUserDto,
    params: RequestParams = {},
  ) =>
    this.request<PickListUser, void>({
      path: `/api/v1/pick-list-user`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pickListUser
   * @name PickListUserControllerFindAll
   * @summary Get all pickListUsers with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pick-list-user
   * @secure
   */
  pickListUserControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: PickListUser[];
      },
      any
    >({
      path: `/api/v1/pick-list-user`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pickListUser
   * @name PickListUserControllerFindOne
   * @summary Get a pickListUser by id
   * @request GET:/api/v1/pick-list-user/{id}
   * @secure
   */
  pickListUserControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<PickListUser, void>({
      path: `/api/v1/pick-list-user/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pickListUser
   * @name PickListUserControllerUpdate
   * @summary Update a pickListUser
   * @request PUT:/api/v1/pick-list-user/{id}
   * @secure
   */
  pickListUserControllerUpdate = (
    id: string,
    data: UpdatePickListUserDto,
    params: RequestParams = {},
  ) =>
    this.request<PickListUser, void>({
      path: `/api/v1/pick-list-user/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pickListUser
   * @name PickListUserControllerRemove
   * @summary Delete a pickListUser
   * @request DELETE:/api/v1/pick-list-user/{id}
   * @secure
   */
  pickListUserControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/pick-list-user/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags pickListValue
   * @name PickListValueControllerCreate
   * @summary Create a new pickListValue
   * @request POST:/api/v1/pick-list-value
   * @secure
   */
  pickListValueControllerCreate = (
    data: CreatePickListValueDto,
    params: RequestParams = {},
  ) =>
    this.request<PickListValue, void>({
      path: `/api/v1/pick-list-value`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pickListValue
   * @name PickListValueControllerFindAll
   * @summary Get all pickListValues with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/pick-list-value
   * @secure
   */
  pickListValueControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: PickListValue[];
      },
      any
    >({
      path: `/api/v1/pick-list-value`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pickListValue
   * @name PickListValueControllerFindOne
   * @summary Get a pickListValue by id
   * @request GET:/api/v1/pick-list-value/{id}
   * @secure
   */
  pickListValueControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<PickListValue, void>({
      path: `/api/v1/pick-list-value/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pickListValue
   * @name PickListValueControllerUpdate
   * @summary Update a pickListValue
   * @request PUT:/api/v1/pick-list-value/{id}
   * @secure
   */
  pickListValueControllerUpdate = (
    id: string,
    data: UpdatePickListValueDto,
    params: RequestParams = {},
  ) =>
    this.request<PickListValue, void>({
      path: `/api/v1/pick-list-value/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags pickListValue
   * @name PickListValueControllerRemove
   * @summary Delete a pickListValue
   * @request DELETE:/api/v1/pick-list-value/{id}
   * @secure
   */
  pickListValueControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/pick-list-value/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags template
   * @name TemplateControllerCreate
   * @summary Create a new template
   * @request POST:/api/v1/template
   * @secure
   */
  templateControllerCreate = (
    data: CreateTemplateDto,
    params: RequestParams = {},
  ) =>
    this.request<Template, void>({
      path: `/api/v1/template`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags template
   * @name TemplateControllerFindAll
   * @summary Get all templates with pagination, filtering, sorting, and searching
   * @request GET:/api/v1/template
   * @secure
   */
  templateControllerFindAll = (
    query?: {
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
    },
    params: RequestParams = {},
  ) =>
    this.request<
      PageDto & {
        data?: Template[];
      },
      any
    >({
      path: `/api/v1/template`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags template
   * @name TemplateControllerFindOne
   * @summary Get a template by id
   * @request GET:/api/v1/template/{id}
   * @secure
   */
  templateControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<Template, void>({
      path: `/api/v1/template/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags template
   * @name TemplateControllerUpdate
   * @summary Update a template
   * @request PUT:/api/v1/template/{id}
   * @secure
   */
  templateControllerUpdate = (
    id: string,
    data: UpdateTemplateDto,
    params: RequestParams = {},
  ) =>
    this.request<Template, void>({
      path: `/api/v1/template/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags template
   * @name TemplateControllerRemove
   * @summary Delete a template
   * @request DELETE:/api/v1/template/{id}
   * @secure
   */
  templateControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/template/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
