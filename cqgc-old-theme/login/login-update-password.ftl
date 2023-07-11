<#import "template.ftl" as layout>
<#import "fragments.ftl" as fragments>

<@layout.registrationLayout displayInfo=true; section>
    <#if section = "header">
        <@fragments.clinNavigation />
    <#elseif section = "form-start">
        <main role="main" style="background-image: url('${url.resourcesPath}/img/background-home.jpg'); background-size: cover; background-repeat: no-repeat; background-position: center;">
            <section class="pt-3">
                <div class="login-clean container pt-5">
                    <div class="row justify-content-center">
                        <div class="col-md-5 pr-3">
                            <div class="mb-5 pb-1 pt-1 bg-white rounded shadow-lg">
                                <form class="m-5" id="kc-reset-password-form" action="${url.loginAction}" method="post" autocomplete="off">
                                    <input type="text" id="username" name="username" value="${username}" autocomplete="username" readonly="readonly" style="display:none;"/>
                                    <input type="password" id="password" name="password" autocomplete="current-password" style="display:none;"/>

                                    <h3 class="form-title">${msg("resetPwdTitle")}</h3>
                                    <div class="intro-text">${msg("resetPwdInstructions")}</div>
    <#elseif section = "form-end">

                                    <div class="form-group">
                                        <label for="password-new">${msg("newPwdLabel")}</label>
                                        <div class="input-group">
                                            <input tabindex="1" type="password" class="form-control" id="password-new" name="password-new" autofocus autocomplete="off">
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="email">
                                                    <svg fill="currentColor" height="16" width="16" viewBox="0 0 24 24" style="width: 1.5rem; height: 1.5rem">
                                                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <span class="forgot">
                                            ${msg("pwdRestrictions")}
                                        </span>
                                    </div>

                                    <div class="form-group">
                                        <label for="password-confirm">${msg("confirmPwdLabel")}</label>
                                        <div class="input-group">
                                            <input tabindex="2" type="password" class="form-control" id="password-confirm" name="password-confirm"  autocomplete="off">
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="pwd">
                                                    <svg fill="currentColor" height="16" width="16" viewBox="0 0 24 24" style="width: 1.5rem; height: 1.5rem">
                                                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <#if isAppInitiatedAction??>
                                            <input tabindex="3" class="btn btn-primary btn-block" type="submit" value="${msg("resetPwdButton")}" />
                                            <button tabindex="4" class="btn btn-primary btn-block" type="submit" name="cancel-aia" value="true" />${msg("doCancel")}</button>
                                            <a tabindex="5" class="backToConnexion forgot" href="${url.loginUrl}" style="margin-top: 15px;">${kcSanitize(msg("backToLogin"))?no_esc}</a>
                                        <#else>
                                            <input tabindex="3" class="btn btn-primary btn-block" type="submit" value="${msg("resetPwdButton")}" />
                                            <a tabindex="4" class="backToConnexion forgot" href="${url.loginUrl}" style="margin-top: 15px;">${kcSanitize(msg("backToLogin"))?no_esc}</a>
                                        </#if>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-7 pl-4">
                            <@fragments.clinPartners />
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <@fragments.clinFooterScripts />
    </#if>
</@layout.registrationLayout>