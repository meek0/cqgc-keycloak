<#import "template.ftl" as layout>
<#import "fragments.ftl" as fragments>

<@layout.registrationLayout displayMessage=false; section>
    <#if section = "form">
        <@fragments.clinNavigation />

        <main role="main" style="background-image: url('${url.resourcesPath}/img/background-home.jpg'); background-size: cover; background-repeat: no-repeat; background-position: center;">
            <div class="container">
                <div class="row justify-content-center">
                    <div id="message" class="col-md-6 py-5">
                        <div class="card" >
                            <div class="card-body" >
                                <h3 class="form-title">
                                    Information
                                </h3>
                                <div class="card-text border-bottom intro-text">
                                    <p class="instruction ">
                                        ${message.summary}<#if requiredActions??><#list requiredActions>: <b><#items as reqActionItem>${msg("requiredAction.${reqActionItem}")}<#sep>, </#items></b></#list><#else></#if>
                                    </p>
                                </div>

                                <div id="kc-form-buttons" style="margin-top:10px" class="${properties.kcFormButtonsClass!}">
                                    <div class="${properties.kcFormButtonsWrapperClass!} backToConnexion">
                                        <#if pageRedirectUri??>
                                            <p><a href="${pageRedirectUri}" class="card-link">${msg("backToApplication")?no_esc}</a></p>
                                        <#elseif actionUri??>
                                            <p><a href="${actionUri}" class="card-link">${msg("proceedWithAction")?no_esc}</a></p>
                                        <#elseif client.baseUrl??>
                                            <p><a href="${client.baseUrl}" class="card-link">${msg("backToApplication")?no_esc}</a></p>
                                        </#if>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <@fragments.clinFooterScripts />
    </#if>
</@layout.registrationLayout>