package bio.ferlab.keycloak.forms;

import org.keycloak.models.UserModel;
import org.keycloak.userprofile.UserProfile;
import org.keycloak.userprofile.ValidationException;
import org.keycloak.validate.ValidationError;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserCreationValidator {

    public static void validate(UserProfile profile, List<String> emailValidationPatternList) {
        String email = profile.getAttributes().getFirstValue(UserModel.EMAIL);
        String firstName = profile.getAttributes().getFirstValue(UserModel.FIRST_NAME);
        String lastName = profile.getAttributes().getFirstValue(UserModel.LAST_NAME);
        String title = profile.getAttributes().getFirstValue("title");
        String license = profile.getAttributes().getFirstValue("license");
        String licenseConfirm = profile.getAttributes().getFirstValue("license_confirm");
        List<String> institutions = profile.getAttributes().getValues("institutions");

        validateEmail(email, emailValidationPatternList);
        validateNonNull(firstName, "firstName");
        validateNonNull(lastName, "lastName");
        validateNonNull(title, "title");
        validateLicense(license, licenseConfirm);
        validateNotEmpty(institutions, "institutions");
    }

    private static void validateEmail(String email, List<String> emailValidationPatternList) {
        validateNonNull(email, "email");
        for (String pattern : emailValidationPatternList) {
            String regexFromPattern = "[a-z0-9]+" + pattern + "$";
            Pattern p = Pattern.compile(regexFromPattern);
            Matcher m = p.matcher(email);
            if (m.matches()) {
                return;
            }
        }
        ValidationException exception = new ValidationException();
        exception.accept(new ValidationError("validateEmail", "email", "error-email-validation"));
        throw exception;
    }

    private static void validateNonNull(String value, String fieldName) {
        if (value == null) {
            ValidationException exception = new ValidationException();
            exception.accept(new ValidationError("validateNonNull", fieldName, "error-required-field"));
            throw exception;
        }
    }

    private static void validateLicense(String license, String licenseConfirm) {
        validateNonNull(license, "license");
        validateNonNull(licenseConfirm, "licenseConfirm");

        Pattern p = Pattern.compile("[0-9]{5}");
        Matcher m = p.matcher(license);
        if (!m.matches()) {
            ValidationException exception = new ValidationException();
            exception.accept(new ValidationError("validateLicense", "license", "error-license-validation"));
            throw exception;
        }

        if (!license.equals(licenseConfirm)) {
            ValidationException exception = new ValidationException();
            exception.accept(new ValidationError("validateLicense", "license", "error-license-verification"));
            throw exception;
        }
    }

    private static void validateNotEmpty(List<String> values, String fieldName) {
        if (values == null || values.isEmpty()) {
            ValidationException exception = new ValidationException();
            exception.accept(new ValidationError("validateNotEmpty", fieldName, "error-not-empty-list-field"));
            throw exception;
        }
    }
}
