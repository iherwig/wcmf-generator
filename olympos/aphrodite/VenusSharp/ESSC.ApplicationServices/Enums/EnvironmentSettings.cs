namespace ESSC.ApplicationServices.Enums
{
    public static class EnvironmentSettings
    {
        public const string PerformanceCounterKey = "sryas:api:performance:timer";

        public static byte[] TokenEncryptionKey =
        {
            139, 232, 126, 113, 161, 124, 44, 209, 228, 167, 70, 203, 119, 163,
            115, 86, 14, 208, 48, 193, 252, 49, 173, 101, 255, 211, 116, 53, 98, 6, 249, 182
        };

        public static string TokenIssuerName = "Sryas";
        public static int TokenExpirationTimeInMinutes = 60*5;

    }
}