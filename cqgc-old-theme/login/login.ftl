<#import "template.ftl" as layout>
<#import "fragments.ftl" as fragments>

<@layout.registrationLayout displayInfo=social.displayInfo displayWide=(realm.password && social.providers??); section>
    <#if section = "header">
        <@fragments.clinNavigation />
    <#elseif section = "form-start">
        <main role="main" style="background-image: url('${url.resourcesPath}/img/background-home.jpg'); background-size: cover; background-repeat: no-repeat; background-position: center;">
            <section class="pt-3">
                <div class="login-clean container pt-5 pb-4">
                    <div class="row justify-content-center">
                        <div class="col-md-5 pr-3">
                            <div class="mb-5 pb-1 pt-1 bg-white rounded shadow-lg">
                                <form class="m-5" id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post" autocomplete="off">
                                    <p class="text-right">
                                        <a class="create-account" href="#">${msg("login.form.create-account")}</a>
                                    </p>
                                    <h3 class="form-title">${msg("login.form.title")}</h3>
                                    <div class="intro-text">${msg("login.form.instructions")}</div>
    <#elseif section = "form-end">

                                    <div class="form-group">
                                        <label for="username">${msg("login.form.email")}</label>
                                        <div class="input-group">
                                            <input type="email" class="form-control" id="username" name="username" value="${(login.username!'')}" placeholder="${msg("login.form.email.placeholder")}" autofocus autocomplete="off" aria-describedby="email">
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="email">
                                                    <svg fill="currentColor" height="16" width="16" viewBox="0 0 24 24" style="width: 1.5rem; height: 1.5rem">
                                                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                                                  </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="password">${msg("login.form.password")}</label>
                                        <div class="input-group">
                                            <input type="password" class="form-control" id="password" name="password" placeholder="${msg("login.form.password.placeholder")}"  autocomplete="off" aria-describedby="pwd">
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="pwd">
                                                    <svg fill="currentColor" height="16" width="16" viewBox="0 0 24 24" style="width: 1.5rem; height: 1.5rem">
                                                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
                                                  </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <#if realm.resetPasswordAllowed>
                                            <small id="emailHelp" class="form-text text-muted">
                                                <a tabindex="3" class="forgot" href="${url.loginResetCredentialsUrl}">${msg("login.form.forgot-password")}</a>
                                            </small>
                                        </#if>
                                    </div>

                                    <div class="form-group">
                                        <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                                        <button tabindex="4" class="btn btn-primary btn-block" type="submit">${msg("login.form.submit")}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-7 pl-5 about">
                            <@fragments.clinPartners />
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <@fragments.clinFooterScripts />
    </#if>
</@layout.registrationLayout>