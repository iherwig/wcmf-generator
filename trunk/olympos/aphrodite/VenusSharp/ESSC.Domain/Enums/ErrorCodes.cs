using System.Runtime.Serialization;

namespace ESSC.Domain.Enums
{
    public enum ErrorCodes
    {
        [EnumMember(Value = "GENERAL_WARNING")]
        GeneralWarning,
        [EnumMember(Value = "GENERAL_ERROR")]
        GeneralError,
        [EnumMember(Value = "GENERAL_FATAL")]
        GeneralFatal,
        [EnumMember(Value = "ACTION_INVALID")]
        ActionInvalid,
        [EnumMember(Value = "SESSION_INVALID")]
        SessionInvalid,
        [EnumMember(Value = "PARAMETER_INVALID")]
        ParameterInvalid,
        [EnumMember(Value = "OID_INVALID")]
        OidInvalid,
        [EnumMember(Value = "CLASS_NAME_INVALID")]
        ClassNameInvalid,
        [EnumMember(Value = "SORT_DIRECTION_UNKNOWN")]
        SortDirectionUnknown,
        [EnumMember(Value = "SORT_FIELD_UNKNOWN")]
        SortFieldUnknown,
        [EnumMember(Value = "OFFSET_OUT_OF_BOUNDS")]
        OffsetOutOfBounds,
        [EnumMember(Value = "LIMIT_NEGATIVE")]
        LimitNegative,
        [EnumMember(Value = "INVALID_DEPTH")]
        InvalidDepth,
        [EnumMember(Value = "AUTHENTICATION_FAILED")]
        AuthenticationFailed,
        [EnumMember(Value = "PERSISTENCE_FAILED")]
        PersistenceFailed
    }
}
