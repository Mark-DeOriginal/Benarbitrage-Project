import React from "react";
import Logo from "../BenarbitrageLogo";
import LanguageSelector from "../LanguageSelector";
import DarkModeToggle from "../DarkModeToggle";
import CopyRight from "../Copyright";

export default function TermsOfUse() {
  return (
    <>
      <nav className="bg-navBarLightBg dark:bg-navBarDarkBg border-b border-navBarBorderLight dark:border-navBarBorderDark tablet:px-10 px-6 py-4 fixed top-0 left-0 z-10 w-full backdrop-blur-sm">
        <div className="wrapper relative flex space-x-2 justify-between mobile_lg:justify-center items-center h-[50px]">
          <Logo />
          <div className="left hidden mobile_lg:block absolute left-0">
            <LanguageSelector className={`left-0`} />
          </div>
          <div className="right mobile_lg:absolute right-0">
            <DarkModeToggle />
          </div>
        </div>
      </nav>
      <div
        className={`terms-of-use mt-32 mobile_lg:mt-36 max-w-[720px] mx-auto text-benBlue-lightB dark:text-benBlue-200`}
      >
        <div className="wrapper px-2 space-y-2">
          <div className="bread-crumb text-sm tablet:text-base mb-6 px-4 tablet:px-6">
            <p>
              <span className="text-benBlue-lightB/60 dark:text-benBlue-lightE">
                benarbitrage
              </span>{" "}
              <a href="/terms-of-use">&gt; Terms of use</a>
            </p>
          </div>
          <div className="header bg-benWhite dark:bg-[#4b4a73] rounded-xl">
            <div className="px-4 tablet:px-6 py-4">
              <h1 className="text-lg tablet:text-xl font-bold dark:text-benOrange-400">
                TERMS OF USE
              </h1>
            </div>
          </div>
          <div className="content bg-benWhite dark:bg-[#4b4a73] rounded-xl">
            <div className="px-4 tablet:px-6 py-4 space-y-4 text-sm mobile_lg:text-base">
              <div className="block">
                <h2>1. OUR SERVICES</h2>
                <p>
                  The information provided when using the Services is not
                  intended for distribution to or use by any person or entity in
                  any jurisdiction or country where such distribution or use
                  would be contrary to law or regulation. Accordingly, those
                  persons who choose to access the Services from other locations
                  do so on their own initiative and are solely responsible for
                  compliance with local laws, if and to the extent local laws
                  are applicable.
                </p>
                <p>
                  You may not use the Services in a way that would violate the
                  Gramm-Leach-Bliley Act (GLBA).The Services are not tailored to
                  comply with industry-specific regulations, so if your
                  interactions would be subjected to such laws, you may not use
                  the Services.
                </p>
              </div>
              <div className="block">
                <h2>2. INTELLECTUAL PROPERTY RIGHTS</h2>
                <p>
                  <b>Our intellectual property</b>
                </p>
                <p>
                  We are the owner or the licensee of all intellectual property
                  rights in our Services, including all source code, databases,
                  functionality, software, website designs, audio, video, text,
                  photographs, and graphics in the Services (collectively, the
                  'Content'), as well as the trademarks, service marks, and
                  logos contained therein (the 'Marks').
                </p>
                <p>
                  Our Content and Marks are protected by copyright and trademark
                  laws (and various other intellectual property rights and
                  unfair competition laws) and treaties in the United States and
                  around the world.
                </p>
                <p>
                  The Content and Marks are provided in or through the Services
                  for your personal, non-commercial use or internal business
                  purpose only.
                </p>
                <p>
                  <b>Your use of our Services</b>
                </p>
                <p>
                  Subject to your compliance with these Legal Terms, including
                  the 'PROHIBITED ACTIVITIES' section below, we grant you a
                  non-exclusive, non-transferable, revocable licence to: (1.
                  access the Services; and (2. download or print a copy of any
                  portion of the Content to which you have properly gained
                  access, solely for your personal, non-commercial use or
                  internal business purpose.
                </p>
                <p>
                  Except as set out in this section or elsewhere in our Legal
                  Terms, no part of the Services and no Content or Marks may be
                  copied, reproduced, aggregated, republished, uploaded, posted,
                  publicly displayed, encoded, translated, transmitted,
                  distributed, sold, licensed, or otherwise exploited for any
                  commercial purpose whatsoever, without our express prior
                  written permission.
                </p>
                <p>
                  If you wish to make any use of the Services, Content, or Marks
                  other than as set out in this section or elsewhere in our
                  Legal Terms, please address your request to:
                  info@benarbitrage.com. If we ever grant you the permission to
                  post, reproduce, or publicly display any part of our Services
                  or Content, you must identify us as the owners or licensors of
                  the Services, Content, or Marks and ensure that any copyright
                  or proprietary notice appears or is visible on posting,
                  reproducing, or displaying our Content.
                </p>
                <p>
                  We reserve all rights not expressly granted to you in and to
                  the Services, Content, and Marks.
                </p>
              </div>
              <div className="block">
                <h2>3. USER REPRESENTATIONS</h2>
                <p>
                  By using the Services, you represent and warrant that: (1) all
                  registration information you submit will be true, accurate,
                  current, and complete; (2) you will maintain the accuracy of
                  such information and promptly update such registration
                  information as necessary; (3) you have the legal capacity and
                  you agree to comply with these Legal Terms; (4) you are not a
                  minor in the jurisdiction in which you reside; (5) you will
                  not access the Services through automated or non-human means,
                  whether through a bot, script or otherwise; (6) you will not
                  use the Services for any illegal or unauthorised purpose; and
                  (7) your use of the Services will not violate any applicable
                  law or regulation.
                </p>
                <p>
                  If you provide any information that is untrue, inaccurate, not
                  current, or incomplete, we have the right to suspend or
                  terminate your account and refuse any and all current or
                  future use of the Services (or any portion thereof).
                </p>
              </div>
              <div className="block">
                <h2>4. USER REGISTRATION</h2>
                <p>
                  You may be required to register to use the Services. You agree
                  to keep your password confidential and will be responsible for
                  all use of your account and password. We reserve the right to
                  remove, reclaim, or change a username you select if we
                  determine, in our sole discretion, that such username is
                  inappropriate, obscene, or otherwise objectionable.
                </p>
              </div>
              <div className="block">
                <h2>5. PROHIBITED ACTIVITIES</h2>
                <p>
                  You may not access or use the Services for any purpose other
                  than that for which we make the Services available. The
                  Services may not be used in connection with any commercial
                  endeavours except those that are specifically endorsed or
                  approved by us.
                </p>
                <p>As a user of the Services, you agree not to:</p>
                <p>
                  <ul className="space-y-2 list-square list-outside ml-5">
                    <li>
                      Systematically retrieve data or other content from the
                      Services to create or compile, directly or indirectly, a
                      collection, compilation, database, or directory without
                      written permission from us.
                    </li>
                    <li>
                      Trick, defraud, or mislead us and other users, especially
                      in any attempt to learn sensitive account information such
                      as user passwords.
                    </li>
                    <li>
                      Circumvent, disable, or otherwise interfere with
                      security-related features of the Services, including
                      features that prevent or restrict the use or copying of
                      any Content or enforce limitations on the use of the
                      Services and/or the Content contained therein.
                    </li>
                    <li>
                      Disparage, tarnish, or otherwise harm, in our opinion, us
                      and/or the Services.
                    </li>
                    <li>
                      Use any information obtained from the Services in order to
                      harass, abuse, or harm another person.
                    </li>
                    <li>
                      Make improper use of our support services or submit false
                      reports of abuse or misconduct.
                    </li>
                    <li>
                      Use the Services in a manner inconsistent with any
                      applicable laws or regulations.
                    </li>
                    <li>
                      Engage in unauthorized framing of or linking to the
                      Services.
                    </li>
                    <li>
                      Upload or transmit (or attempt to upload or to transmit)
                      viruses, Trojan horses, or other material, including
                      excessive use of capital letters and spamming (continuous
                      posting of repetitive text), that interferes with any
                      party’s uninterrupted use and enjoyment of the Services or
                      modifies, impairs, disrupts, alters, or interferes with
                      the use, features, functions, operation, or maintenance of
                      the Services.
                    </li>
                    <li>
                      Engage in any automated use of the system, such as using
                      scripts to send comments or messages, or using any data
                      mining, robots, or similar data gathering and extraction
                      tools.
                    </li>
                    <li>
                      Delete the copyright or other proprietary rights notice
                      from any Content.
                    </li>
                    <li>
                      Attempt to impersonate another user or person or use the
                      username of another user.
                    </li>
                    <li>
                      Upload or transmit (or attempt to upload or to transmit)
                      any material that acts as a passive or active information
                      collection or transmission mechanism, including without
                      limitation, clear graphics interchange formats ('gifs'),
                      1×1 pixels, web bugs, cookies, or other similar devices
                      (sometimes referred to as 'spyware' or 'passive collection
                      mechanisms' or 'pcms').
                    </li>
                    <li>
                      Interfere with, disrupt, or create an undue burden on the
                      Services or the networks or services connected to the
                      Services.
                    </li>
                    <li>
                      Harass, annoy, intimidate, or threaten any of our
                      employees or agents engaged in providing any portion of
                      the Services to you.
                    </li>
                    <li>
                      Attempt to bypass any measures of the Services designed to
                      prevent or restrict access to the Services, or any portion
                      of the Services.
                    </li>
                    <li>
                      Copy or adapt the Services' software, including but not
                      limited to Flash, PHP, HTML, JavaScript, or other code.
                    </li>
                    <li>
                      Except as permitted by applicable law, decipher,
                      decompile, disassemble, or reverse engineer any of the
                      software comprising or in any way making up a part of the
                      Services.
                    </li>
                    <li>
                      Except as may be the result of standard search engine or
                      Internet browser usage, use, launch, develop, or
                      distribute any automated system, including without
                      limitation, any spider, robot, cheat utility, scraper, or
                      offline reader that accesses the Services, or use or
                      launch any unauthorized script or other software.
                    </li>
                    <li>
                      Use a buying agent or purchasing agent to make purchases
                      on the Services.
                    </li>
                    <li>
                      Make any unauthorized use of the Services, including
                      collecting usernames and/or email addresses of users by
                      electronic or other means for the purpose of sending
                      unsolicited email, or creating user accounts by automated
                      means or under false pretenses.
                    </li>
                    <li>
                      Use the Services as part of any effort to compete with us
                      or otherwise use the Services and/or the Content for any
                      revenue-generating endeavor or commercial enterprise.
                    </li>
                    <li>Use the service to deceive unsuspecting investors.</li>
                    <li>Sell or otherwise transfer your profile.</li>
                    <li>Create multiple accounts or profiles.</li>
                  </ul>
                </p>
              </div>
              <div className="block">
                <h2>6. CONTRIBUTION LICENSE</h2>
                <p>
                  You and Services agree that we may access, store, process, and
                  use any information and personal data that you provide and
                  your choices (including settings). By submitting suggestions
                  or other feedback regarding the Services, you agree that we
                  can use and share such feedback for any purpose without
                  compensation to you.
                </p>
              </div>
              <div className="block">
                <h2>7. SERVICES MANAGEMENT</h2>
                <p>
                  We reserve the right, but not the obligation, to: (1) monitor
                  the Services for violations of these Legal Terms; (2) take
                  appropriate legal action against anyone who, in our sole
                  discretion, violates the law or these Legal Terms, including
                  without limitation, reporting such user to law enforcement
                  authorities; (3) in our sole discretion and without
                  limitation, refuse, restrict access to, limit the availability
                  of, or disable (to the extent technologically feasible) any of
                  your Contributions or any portion thereof; (4) in our sole
                  discretion and without limitation, notice, or liability, to
                  remove from the Services or otherwise disable all files and
                  content that are excessive in size or are in any way
                  burdensome to our systems; and (5) otherwise manage the
                  Services in a manner designed to protect our rights and
                  property and to facilitate the proper functioning of the
                  Services.
                </p>
              </div>
              <div className="block">
                <h2>8. TERM AND TERMINATION</h2>
                <p>
                  These Legal Terms shall remain in full force and effect while
                  you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF
                  THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE
                  DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND
                  USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES),
                  TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING
                  WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY,
                  OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY
                  APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
                  PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY
                  CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT
                  WARNING, IN OUR SOLE DISCRETION.
                </p>
                <p>
                  If we terminate or suspend your account for any reason, you
                  are prohibited from registering and creating a new account
                  under your name, a fake or borrowed name, or the name of any
                  third party, even if you may be acting on behalf of the third
                  party. In addition to terminating or suspending your account,
                  we reserve the right to take appropriate legal action,
                  including without limitation pursuing civil, criminal, and
                  injunctive redress.
                </p>
              </div>
              <div className="block">
                <h2>9. MODIFICATIONS AND INTERRUPTIONS</h2>
                <p>
                  We reserve the right to change, modify, or remove the contents
                  of the Services at any time or for any reason at our sole
                  discretion without notice. However, we have no obligation to
                  update any information on our Services. We will not be liable
                  to you or any third party for any modification, price change,
                  suspension, or discontinuance of the Services.
                </p>
                <p>
                  We cannot guarantee the Services will be available at all
                  times. We may experience hardware, software, or other problems
                  or need to perform maintenance related to the Services,
                  resulting in interruptions, delays, or errors. We reserve the
                  right to change, revise, update, suspend, discontinue, or
                  otherwise modify the Services at any time or for any reason
                  without notice to you. You agree that we have no liability
                  whatsoever for any loss, damage, or inconvenience caused by
                  your inability to access or use the Services during any
                  downtime or discontinuance of the Services. Nothing in these
                  Legal Terms will be construed to obligate us to maintain and
                  support the Services or to supply any corrections, updates, or
                  releases in connection therewith.
                </p>
              </div>
              <div className="block">
                <h2>10. GOVERNING LAW</h2>
                <p>
                  These Legal Terms and your use of the Services are governed by
                  and construed in accordance with the laws of the State of
                  California applicable to agreements made and to be entirely
                  performed within the State of California, without regard to
                  its conflict of law principles.
                </p>
              </div>
              <div className="block">
                <h2>11. CORRECTIONS</h2>
                <p>
                  There may be information on the Services that contains
                  typographical errors, inaccuracies, or omissions, including
                  descriptions, pricing, availability, and various other
                  information. We reserve the right to correct any errors,
                  inaccuracies, or omissions and to change or update the
                  information on the Services at any time, without prior notice.
                </p>
              </div>
              <div className="block">
                <h2>12. DISCLAIMER</h2>
                <p>
                  There may be information on the Services that contains
                  typographical errors, inaccuracies, or omissions, including
                  descriptions, pricing, availability, and various other
                  information. We reserve the right to correct any errors,
                  inaccuracies, or omissions and to change or update the
                  information on the Services at any time, without prior notice.
                </p>
              </div>
              <div className="block">
                <h2>13. LIMITATIONS OF LIABILITY</h2>
                <p>
                  IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE
                  LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT,
                  CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
                  DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR
                  OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF
                  WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR
                  LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF
                  THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE
                  AMOUNT PAID, IF ANY, BY YOU TO US. CERTAIN US STATE LAWS AND
                  INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED
                  WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES.
                  IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE
                  DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY
                  HAVE ADDITIONAL RIGHTS.
                </p>
              </div>
              <div className="block">
                <h2>14. INDEMNIFICATION</h2>
                <p>
                  You agree to defend, indemnify, and hold us harmless,
                  including our subsidiaries, affiliates, and all of our
                  respective officers, agents, partners, and employees, from and
                  against any loss, damage, liability, claim, or demand,
                  including reasonable attorneys’ fees and expenses, made by any
                  third party due to or arising out of: (1) use of the Services;
                  (2) breach of these Legal Terms; (3) any breach of your
                  representations and warranties set forth in these Legal Terms;
                  (4) your violation of the rights of a third party, including
                  but not limited to intellectual property rights; or (5) any
                  overt harmful act toward any other user of the Services with
                  whom you connected via the Services. Notwithstanding the
                  foregoing, we reserve the right, at your expense, to assume
                  the exclusive defence and control of any matter for which you
                  are required to indemnify us, and you agree to cooperate, at
                  your expense, with our defence of such claims. We will use
                  reasonable efforts to notify you of any such claim, action, or
                  proceeding which is subject to this indemnification upon
                  becoming aware of it.
                </p>
              </div>
              <div className="block">
                <h2>15. USER DATA</h2>
                <p>
                  We will maintain certain data that you transmit to the
                  Services for the purpose of managing the performance of the
                  Services, as well as data relating to your use of the
                  Services. Although we perform regular routine backups of data,
                  you are solely responsible for all data that you transmit or
                  that relates to any activity you have undertaken using the
                  Services. You agree that we shall have no liability to you for
                  any loss or corruption of any such data, and you hereby waive
                  any right of action against us arising from any such loss or
                  corruption of such data.
                </p>
              </div>
              <div className="block">
                <h2>16. MISCELLANEOUS</h2>
                <p>
                  These Legal Terms and any policies or operating rules posted
                  by us on the Services or in respect to the Services constitute
                  the entire agreement and understanding between you and us. Our
                  failure to exercise or enforce any right or provision of these
                  Legal Terms shall not operate as a waiver of such right or
                  provision. These Legal Terms operate to the fullest extent
                  permissible by law. We may assign any or all of our rights and
                  obligations to others at any time. We shall not be responsible
                  or liable for any loss, damage, delay, or failure to act
                  caused by any cause beyond our reasonable control. If any
                  provision or part of a provision of these Legal Terms is
                  determined to be unlawful, void, or unenforceable, that
                  provision or part of the provision is deemed severable from
                  these Legal Terms and does not affect the validity and
                  enforceability of any remaining provisions. There is no joint
                  venture, partnership, employment or agency relationship
                  created between you and us as a result of these Legal Terms or
                  use of the Services. You agree that these Legal Terms will not
                  be construed against us by virtue of having drafted them. You
                  hereby waive any and all defences you may have based on the
                  electronic form of these Legal Terms and the lack of signing
                  by the parties hereto to execute these Legal Terms.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer text-center mt-20 mb-8">
          <CopyRight />
        </div>
      </div>
    </>
  );
}
