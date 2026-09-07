window.MATCHWISE_QUESTIONS = [
  {
    "id": "q1",
    "category": "Personality",
    "type": "scenario",
    "weight": 1.2,
    "trait": "extroversion",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: After a demanding workweek, how do you most naturally recharge your energy on a Friday evening?"
    },
    "arabic": {
      "text": "سيناريو: بعد أسبوع عمل حافل وشاق، كيف تستعيد طاقتك وحيويتك في مساء يوم الجمعة؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Attending a lively social gathering or large family/friend get-together (Isteraha).",
        "arabic": "حضور تجمع اجتماعي حيوي أو جمعة عائلية/استراحة مع الأصدقاء.",
        "trait_scores": {
          "extroversion": 2,
          "mbti_e": 2,
          "disc_i": 1.5,
          "firo_exp_inc": 1.5,
          "hartman_yellow": 1.2,
          "birkman_usual_social": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "A quiet dinner or cozy cafe visit with one close friend or spouse.",
        "arabic": "عشاء هادئ أو جلسة في مقهى راقٍ مع شخص مقرب واحد أو شريك الحياة.",
        "trait_scores": {
          "extroversion": 0.5,
          "mbti_e": 0.5,
          "mbti_i": 0.5,
          "disc_i": 1.5,
          "firo_exp_inc": 1.5,
          "hartman_yellow": 1.2,
          "birkman_usual_social": 1.5
        }
      },
      {
        "id": "opt3",
        "english": "Staying home in complete solitude, resting, reading, or watching a favorite show.",
        "arabic": "البقاء في المنزل بمفردي في هدوء تام، للاسترخاء أو القراءة أو مشاهدة عمل مفضل.",
        "trait_scores": {
          "extroversion": -1.5,
          "mbti_i": 2,
          "disc_c": 1.2,
          "hartman_white": 1.2,
          "birkman_need_freedom": 1.5
        }
      }
    ]
  },
  {
    "id": "q2",
    "category": "Personality",
    "type": "scenario",
    "weight": 1,
    "trait": "mbti_sn",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: When evaluating a new venture, travel plan, or life project, you naturally focus on:"
    },
    "arabic": {
      "text": "سيناريو: عند تقييم مشروع جديد أو خطة سفر أو قرار مصيري، ينصب تركيزك العفوي على:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Concrete facts, pragmatic details, proven steps, and realistic immediate costs.",
        "arabic": "الحقائق الملموسة، التفاصيل العملية، الخطوات المجربة، والتكاليف الفعلية المباشرة.",
        "trait_scores": {
          "mbti_s": 2,
          "openness": -0.5
        }
      },
      {
        "id": "opt2",
        "english": "The big picture, creative possibilities, visionary outcomes, and long-term potential.",
        "arabic": "الصورة الكلية الشاملة، الأفكار المبتكرة، والرؤية المستقبلية بعيدة المدى.",
        "trait_scores": {
          "mbti_n": 2,
          "openness": 1.5
        }
      }
    ]
  },
  {
    "id": "q3",
    "category": "Personality",
    "type": "scenario",
    "weight": 1,
    "trait": "mbti_tf",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: When a loved one makes a major mistake and seeks your help, your primary initial instinct is:"
    },
    "arabic": {
      "text": "سيناريو: عندما يقع شخص عزيز في خطأ كبير ويلجأ إليك، ما هي ردة فعلك الأولى التلقائية؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Analyze the situation objectively, identify root causes, and offer rational solutions.",
        "arabic": "تحليل الموقف بعقلانية ومنطقية، تشخيص مواضع الخلل، وتقديم حلول عملية مباشرة.",
        "trait_scores": {
          "mbti_t": 2,
          "agreeableness": -0.5,
          "disc_d": 1.5,
          "hartman_red": 1.5,
          "birkman_usual_assertive": 1.5,
          "firo_exp_ctrl": 1.2,
          "schwartz_achievement": 1.2
        }
      },
      {
        "id": "opt2",
        "english": "Offer deep emotional validation, empathy, and comfort before analyzing the facts.",
        "arabic": "الاحتواء والتعاطف العاطفي الصادق، وتطييب خاطره وطمأنته قبل مناقشة أي أسباب.",
        "trait_scores": {
          "mbti_f": 2,
          "agreeableness": 1.5,
          "disc_s": 1.5,
          "hartman_blue": 1.5,
          "birkman_need_empathy": 1.5,
          "birkman_usual_supportive": 1.5,
          "firo_exp_aff": 1.2,
          "attachment_secure": 1,
          "schwartz_benevolence": 1.5,
          "gottman_repair_receptivity": 1.5
        }
      }
    ]
  },
  {
    "id": "q4",
    "category": "Personality",
    "type": "scenario",
    "weight": 1,
    "trait": "mbti_jp",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: How do you prefer to manage daily life schedules, weekends, and holidays?"
    },
    "arabic": {
      "text": "سيناريو: كيف تفضل إدارة جداول حياتك اليومية وعطلات نهاية الأسبوع والإجازات؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Carefully organized with scheduled itineraries, confirmed bookings, and clear timelines.",
        "arabic": "تنظيم دقيق مع مواعيد محددة وحجوزات مسبقة وخطط واضحة تعطي شعوراً بالاطمئنان.",
        "trait_scores": {
          "mbti_j": 2,
          "conscientiousness": 1.5,
          "disc_c": 1.5,
          "hartman_red": 1,
          "birkman_need_structure": 1.5,
          "birkman_usual_structured": 1.5,
          "schwartz_security": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "Spontaneous and flexible, keeping options open to adapt to mood and inspirations.",
        "arabic": "عفوية ومرونة تامة، وترك الخيارات مفتوحة للتكيف مع المزاج والفرص اللحظية.",
        "trait_scores": {
          "mbti_p": 2,
          "conscientiousness": -1,
          "hartman_yellow": 1.5,
          "schwartz_hedonism": 1.5,
          "schwartz_self_direction": 1.2
        }
      }
    ]
  },
  {
    "id": "q5",
    "category": "Personality",
    "type": "likert",
    "weight": 1,
    "trait": "agreeableness",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I find it easy to empathize with people who have completely different perspectives from my own."
    },
    "arabic": {
      "text": "أجد من السهل التعاطف مع الآخرين وتفهم مشاعرهم حتى لو كانت وجهات نظرهم مختلفة تماماً عني."
    }
  },
  {
    "id": "q6",
    "category": "Personality",
    "type": "likert",
    "weight": 1.1,
    "trait": "conscientiousness",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I am disciplined with my daily habits, keeping my living spaces organized and honoring deadlines diligently."
    },
    "arabic": {
      "text": "أنا شخص منضبط في عاداتي اليومية، أحرص على ترتيب مساحتي الخاصة والوفاء بالتزاماتي في وقتها."
    }
  },
  {
    "id": "q7",
    "category": "Personality",
    "type": "likert",
    "weight": 1.1,
    "trait": "neuroticism",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "During unexpected marital disagreements or periods of uncertainty, I easily feel overwhelmed by anxiety."
    },
    "arabic": {
      "text": "أثناء الخلافات المفاجئة أو فترات الغموض والضغوط، يسهل أن يتملكني القلق والتوتر الشديد."
    }
  },
  {
    "id": "q8",
    "category": "Personality",
    "type": "likert",
    "weight": 1,
    "trait": "openness",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I love exploring unfamiliar cultures, novel cuisines, modern art, and engaging in deep intellectual discussions."
    },
    "arabic": {
      "text": "أحب استكشاف الثقافات الجديدة والتجارب المبتكرة والنقاشات الفكرية والفلسفية العميقة."
    }
  },
  {
    "id": "q9",
    "category": "Lifestyle",
    "type": "scenario",
    "weight": 1.3,
    "trait": "ideology_traditionalism",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Situation: Regarding living arrangements at the start of marriage (Family Villa vs. Independent Residence):"
    },
    "arabic": {
      "text": "موقف: بخصوص ترتيبات السكن عند بداية الزواج (السكن في فيلا العائلة مقابل شقة/منزل مستقل):"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Living in a suite within the family villa is ideal; it strengthens family ties and saves money.",
        "arabic": "السكن في جناح ملحق بفيلا العائلة خيار ممتاز؛ يعزز صلة الرحم ويوفر تكاليف المعيشة.",
        "trait_scores": {
          "ideology_traditionalism": 2,
          "ideology_liberalism": -1,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5,
          "schwartz_self_direction": 2.5
        }
      },
      {
        "id": "opt2",
        "english": "Acceptable only as a temporary 1-2 year transition, with a clear plan for an independent home.",
        "arabic": "مقبول كحل مؤقت لمدة سنة أو سنتين كحد أقصى مع التزام بالانتقال إلى مسكن مستقل.",
        "trait_scores": {
          "ideology_traditionalism": 0.5,
          "ideology_liberalism": 0.5,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5,
          "schwartz_self_direction": 2.5
        }
      },
      {
        "id": "opt3",
        "english": "A completely independent home from day one is non-negotiable for marital privacy and autonomy.",
        "arabic": "الاستقلال التام في منزل منفصل من أول يوم شرط أساسي لا تنازل فيه لحفظ الخصوصية وبناء الأسرة.",
        "trait_scores": {
          "ideology_traditionalism": -1.5,
          "ideology_liberalism": 2,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5,
          "schwartz_self_direction": 2.5
        }
      }
    ]
  },
  {
    "id": "q10",
    "category": "Lifestyle",
    "type": "scenario",
    "weight": 1.1,
    "trait": "ideology_liberalism",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Situation: How should social visits and family gatherings be balanced with private marital weekends?"
    },
    "arabic": {
      "text": "موقف: كيف يجب الموازنة بين الواجبات والزيارات العائلية الأسبوعية وبين خصوصية العطلة الزوجية؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Family gatherings are a weekly top priority that should take precedence over personal leisure.",
        "arabic": "الزيارات العائلية الأسبوعية أولوية قصوى ودائمة تسبق أي برامج ترفيهية خاصة.",
        "trait_scores": {
          "ideology_traditionalism": 2,
          "family_influence": 1.5,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "Balanced weekly: one dedicated day for extended families and one protected day for the couple.",
        "arabic": "توازن منصف: تخصيص يوم للعائلة ويوم آخر محمي وخاص تماماً للزوجين للاسترخاء.",
        "trait_scores": {
          "ideology_traditionalism": 0.5,
          "ideology_liberalism": 0.5,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5,
          "schwartz_self_direction": 2.5
        }
      },
      {
        "id": "opt3",
        "english": "Marital autonomy comes first; family visits should happen flexibly without rigid obligations.",
        "arabic": "استقلالية الزوجين أولاً، والزيارات العائلية تتم بمرونة وبحسب الرغبة والوقت المتاح.",
        "trait_scores": {
          "ideology_liberalism": 1.5,
          "boundaries_independence": 1.5,
          "schwartz_self_direction": 2.5
        }
      }
    ]
  },
  {
    "id": "q11",
    "category": "Money",
    "type": "scenario",
    "weight": 1.3,
    "trait": "ideology_capitalism",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Situation: In a dual-income marriage where both partners have good careers, how should major household expenses be split?"
    },
    "arabic": {
      "text": "موقف: في حال كان كلا الزوجين يعملان بدخل جيد، كيف ينبغي توزيع المصاريف المنزلية الأساسية؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Equitable partnership: Shared costs proportional to income or 50/50 for mutual building.",
        "arabic": "شراكة عصرية متكافئة: تقاسم المصاريف بنسبة الدخل أو مناصفة لبناء المستقبل سوياً.",
        "trait_scores": {
          "ideology_capitalism": 1.5,
          "ideology_feminism": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "Hybrid: Husband pays core living essentials (rent, groceries); wife voluntarily contributes to luxuries.",
        "arabic": "نموذج مرن: الزوج يتكفل بالأساسيات (السكن والمقاضي)، ومشاركة الزوجة اختيارية في الكماليات والسفر.",
        "trait_scores": {
          "ideology_traditionalism": 1,
          "ideology_capitalism": 0.5,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5
        }
      },
      {
        "id": "opt3",
        "english": "Traditional male financial responsibility (Nafaqah): Husband bears all expenses; wife retains full personal wealth.",
        "arabic": "النموذج التقليدي الكامل (النفقة الواجبة): الزوج يتحمل كافة التكاليف، ومال الزوجة خاص بها بالكامل.",
        "trait_scores": {
          "ideology_traditionalism": 2,
          "ideology_feminism": -1,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5
        }
      }
    ]
  },
  {
    "id": "q12",
    "category": "Money",
    "type": "scenario",
    "weight": 1.1,
    "trait": "financial_values",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Situation: How do you prefer to manage bank accounts and financial transparency in marriage?"
    },
    "arabic": {
      "text": "موقف: كيف تفضل إدارة الحسابات البنكية ومستوى الشفافية المالية بين الزوجين؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Combined/Joint budget: Complete transparency of all income, savings, and joint investments.",
        "arabic": "ميزانية مشتركة وشفافية كاملة: الاطلاع المتبادل على المداخيل والمدخرات والاستثمار المشترك.",
        "trait_scores": {
          "decision_consensus": 1.5,
          "trust_privacy": -0.5
        }
      },
      {
        "id": "opt2",
        "english": "Three-account system: A shared account for household expenses, plus private personal accounts.",
        "arabic": "نظام الحسابات الثلاثة: حساب مشترك للمصاريف المنزلية، مع استقلالية الحساب الشخصي لكل طرف.",
        "trait_scores": {
          "boundaries_independence": 1,
          "decision_consensus": 1
        }
      },
      {
        "id": "opt3",
        "english": "Strict financial separation: Each manages their money independently without inquiry into details.",
        "arabic": "استقلالية وخصوصية مالية تامة: يدير كل طرف أمواله بمفرده دون تدخل أو تفاصيل من الطرف الآخر.",
        "trait_scores": {
          "boundaries_independence": 2,
          "trust_privacy": 1.5
        }
      }
    ]
  },
  {
    "id": "q13",
    "category": "Lifestyle",
    "type": "scenario",
    "weight": 1.2,
    "trait": "ideology_liberalism",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Situation: When it comes to career environments, professional networking, and mixed-gender work settings:"
    },
    "arabic": {
      "text": "موقف: فيما يتعلق ببيئات العمل الحديثة والتواصل المهني والفعاليات المختلطة:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "I fully embrace modern professional settings and support networking and business events with confidence.",
        "arabic": "أتقبل بيئات العمل العصرية بثقة تامة، وأدعم التواصل المهني الفعال وحضور فعاليات العمل.",
        "trait_scores": {
          "ideology_liberalism": 2,
          "trust_jealousy": -1,
          "schwartz_self_direction": 2.5
        }
      },
      {
        "id": "opt2",
        "english": "Acceptable with professional decorum, clear personal boundaries, and open communication.",
        "arabic": "مقبول مع الالتزام التام بالحدود المهنية واللباقة والوضوح والشفافية بين الزوجين.",
        "trait_scores": {
          "ideology_traditionalism": 0.5,
          "ideology_liberalism": 0.5,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5,
          "schwartz_self_direction": 2.5
        }
      },
      {
        "id": "opt3",
        "english": "I strongly prefer conservative, gender-separated or strictly formal work environments with minimal interaction.",
        "arabic": "أفضل البيئات المحافظة جداً والحد الأدنى الضروري من التعامل لحفظ الراحة والغيرة الزوجية.",
        "trait_scores": {
          "ideology_traditionalism": 2,
          "trust_jealousy": 1.5,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5
        }
      }
    ]
  },
  {
    "id": "q14",
    "category": "Lifestyle",
    "type": "scenario",
    "weight": 1,
    "trait": "lifestyle_social_frequency",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Situation: How often do you like hosting guests, friends, or relatives in your home during an average month?"
    },
    "arabic": {
      "text": "سيناريو: ما هو معدل استضافة العزائم والضيوف والأصدقاء في المنزل الذي تراه مثالياً شهرياً؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Frequently (multiple times a week); I love a vibrant, hospitable home full of people.",
        "arabic": "بشكل متكرر ومستمر (عدة مرات أسبوعياً)؛ أحب البيت العامر بالضيافة والمجالس الحية.",
        "trait_scores": {
          "social_frequency": 2,
          "extroversion": 1.5,
          "disc_i": 1.5,
          "firo_exp_inc": 1.5,
          "hartman_yellow": 1.2,
          "birkman_usual_social": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "Moderately (1 to 2 organized gatherings per month) to balance social life with privacy.",
        "arabic": "بشكل متوازن ومنظم (مرة أو مرتين شهرياً) للتوفيق بين الكرم والهدوء المنزلي.",
        "trait_scores": {
          "social_frequency": 0.5
        }
      },
      {
        "id": "opt3",
        "english": "Rarely; I consider home a private personal sanctuary and prefer meeting people outside.",
        "arabic": "نادراً؛ أعتبر المنزل ملاذاً شخصياً للراحة والهدوء، وأفضل لقاء المعارف في الخارج.",
        "trait_scores": {
          "social_frequency": -1.5,
          "extroversion": -1,
          "disc_c": 1.2,
          "hartman_white": 1.2,
          "birkman_need_freedom": 1.5
        }
      }
    ]
  },
  {
    "id": "q15",
    "category": "Decision making",
    "type": "scenario",
    "weight": 1.3,
    "trait": "ideology_feminism",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Situation: When a major life decision reaches a deadlock and consensus cannot be reached after long debate:"
    },
    "arabic": {
      "text": "موقف: عندما يصل الزوجان لطريق مسدود في قرار مصيري مشترك بعد نقاش طويل دون اتفاق:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "We freeze the decision until a mutual consensus or third-party expert mediator advises us.",
        "arabic": "تجميد القرار حتى نصل لتوافق كامل، أو الاستعانة بمستشار متخصص لمساعدتنا في الاختيار.",
        "trait_scores": {
          "decision_consensus": 2,
          "ideology_feminism": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "We divide domains of authority (e.g., finances to one, domestic/children to the other) based on expertise.",
        "arabic": "تقسيم الصلاحيات بحسب التخصص والمجال، فيكون لكل طرف القرار النهائي في مجاله.",
        "trait_scores": {
          "decision_consensus": 0.5,
          "boundaries_independence": 1
        }
      },
      {
        "id": "opt3",
        "english": "The husband carries final leadership authority (Qiwamah) to break the deadlock and shoulder responsibility.",
        "arabic": "يمتلك الزوج حق القيادة وحسم القرار النهائي (القوامة) لتحريك الأمور وتحمل المسؤولية.",
        "trait_scores": {
          "ideology_traditionalism": 2,
          "ideology_feminism": -1.5,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5
        }
      }
    ]
  },
  {
    "id": "q16",
    "category": "Decision making",
    "type": "scenario",
    "weight": 1.1,
    "trait": "decision_consensus",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Situation: For daily household choices (furnishing, weekend plans, dinner options, car purchases):"
    },
    "arabic": {
      "text": "موقف: بالنسبة للقرارات اليومية المتكررة (تأثيث المنزل، وجهات الترفيه، المشتريات اليومية):"
    },
    "options": [
      {
        "id": "opt1",
        "english": "I strongly prefer continuous mutual consultation on nearly every detail.",
        "arabic": "أفضل الشورى والتشاور المتبادل والمستمر في كل التفاصيل والقرارات.",
        "trait_scores": {
          "decision_consensus": 2
        }
      },
      {
        "id": "opt2",
        "english": "I prefer high personal autonomy with brief updates rather than micromanaged permission.",
        "arabic": "أفضل المرونة والاستقلالية السريعة مع الإبلاغ دون الحاجة للموافقة المسبقة في كل أمر.",
        "trait_scores": {
          "boundaries_independence": 1.5,
          "decision_consensus": -0.5
        }
      }
    ]
  },
  {
    "id": "q17_m",
    "category": "Money",
    "type": "scenario",
    "weight": 1.1,
    "trait": "financial_values",
    "importance": "medium",
    "gender_constraint": "M",
    "marital_constraint": null,
    "english": {
      "text": "Situation (Men): Regarding wedding costs, dowry (Mahr), and bridal celebrations in modern society:"
    },
    "arabic": {
      "text": "موقف (للرجال): بخصوص تكاليف الزواج والمهر وحفل الزفاف في المجتمع اليوم:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "I am willing to fund an elaborate luxury wedding and substantial dowry to honor tradition and status.",
        "arabic": "مستعد لتحمل تكاليف حفل زفاف فخم ومهر مرتفع تكريماً للعروس ومواكبة للوجاهة الاجتماعية.",
        "trait_scores": {
          "ideology_traditionalism": 1.5,
          "money_saver": -1,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "I prioritize a moderate, sensible celebration, directing surplus funds toward housing and investments.",
        "arabic": "أفضل احتفالاً معتدلاً وذكياً، وتوجيه الجزء الأكبر من الميزانية لتأثيث المنزل والاستثمار.",
        "trait_scores": {
          "money_saver": 1.5,
          "conscientiousness": 1,
          "disc_c": 1.5,
          "hartman_red": 1,
          "birkman_need_structure": 1.5,
          "birkman_usual_structured": 1.5,
          "schwartz_security": 1.5
        }
      },
      {
        "id": "opt3",
        "english": "I strongly believe in a minimal, intimate wedding to start marriage without any financial burden.",
        "arabic": "أؤمن بحفل عائلي مصغر ومختصر لبدء الحياة الزوجية دون أي أعباء مالية أو ديون.",
        "trait_scores": {
          "money_saver": 2,
          "ideology_liberalism": 1,
          "schwartz_self_direction": 2.5
        }
      }
    ]
  },
  {
    "id": "q17_f",
    "category": "Money",
    "type": "scenario",
    "weight": 1.1,
    "trait": "financial_values",
    "importance": "medium",
    "gender_constraint": "F",
    "marital_constraint": null,
    "english": {
      "text": "Situation (Women): Regarding wedding preparations, dowry expectations, and wedding celebrations:"
    },
    "arabic": {
      "text": "موقف (للنساء): بخصوص ترتيبات وتوقعات حفل الزفاف والمهر والاحتفال:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "A memorable, elegant wedding and generous dowry are vital expressions of value and cultural dignity.",
        "arabic": "حفل الزفاف المميز والمهر اللائق تعبير أساسي عن التقدير والفرحة والكرامة الاجتماعية.",
        "trait_scores": {
          "ideology_traditionalism": 1.5,
          "money_saver": -1,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "I favor an elegant but balanced wedding, preserving capital for honeymoon travel and home furnishing.",
        "arabic": "أفضل زفافاً أنيقاً ومعتدلاً، مع توفير الميزانية للسفر وشهر العسل وتجهيز المنزل.",
        "trait_scores": {
          "money_saver": 1.5,
          "conscientiousness": 1,
          "disc_c": 1.5,
          "hartman_red": 1,
          "birkman_need_structure": 1.5,
          "birkman_usual_structured": 1.5,
          "schwartz_security": 1.5
        }
      },
      {
        "id": "opt3",
        "english": "A simplified, intimate gathering is far more meaningful and modern than extravagant lavishness.",
        "arabic": "الاحتفال البسيط والمختصر أكثر راحة وعصرية، ويبعد الزواج عن الإسراف والتكلف.",
        "trait_scores": {
          "money_saver": 2,
          "ideology_liberalism": 1,
          "schwartz_self_direction": 2.5
        }
      }
    ]
  },
  {
    "id": "q18_sgl",
    "category": "Lifestyle",
    "type": "scenario",
    "weight": 1.2,
    "trait": "lifestyle_transition",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": "single",
    "english": {
      "text": "Situation (Single / First-time Marriage): Regarding your personal readiness, lifestyle transition, and expectations when entering married life for the first time:"
    },
    "arabic": {
      "text": "موقف (للمقبلين على الزواج لأول مرة / العزاب): بخصوص جاهزيتك النفسية وتوقعاتك عند الانتقال من حياة العزوبية إلى الشراكة الزوجية الكاملة:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "I am eager and fully ready to blend daily routines, share personal spaces, and build mutual life habits collaboratively.",
        "arabic": "أنا متلهف ومستعد تماماً لمشاركة تفاصيل يومي، وتعديل عاداتي الفردية، وبناء نمط حياة مشترك بمرونة وشغف.",
        "trait_scores": {
          "attachment_secure": 2.0,
          "birkman_usual_social": 1.5,
          "firo_exp_aff": 1.5,
          "hartman_blue": 1.5,
          "disc_s": 1.2,
          "gottman_repair_receptivity": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "I look forward to close companionship, while valuing clear boundaries, personal space, and independent pursuits.",
        "arabic": "أتطلع بحماس للمودة والاستقرار، مع حرصي الواعي على الاحتفاظ بمساحة شخصية معقولة واستقلالية صحية.",
        "trait_scores": {
          "boundaries_independence": 2.0,
          "birkman_need_freedom": 2.0,
          "hartman_white": 2.0,
          "disc_c": 1.2,
          "schwartz_self_direction": 1.5
        }
      },
      {
        "id": "opt3",
        "english": "It feels like a major psychological leap; I value taking deliberate, structured steps together to adjust progressively.",
        "arabic": "أشعر أنها نقلة محورية كبرى؛ وأفضل التدرج والتخطيط المتأني لنبني التناغم والتوافق خطوة بخطوة.",
        "trait_scores": {
          "conscientiousness": 1.5,
          "disc_c": 1.5,
          "hartman_red": 1.0,
          "birkman_need_structure": 2.0,
          "schwartz_security": 1.5
        }
      }
    ]
  },
  {
    "id": "q18_mrd",
    "category": "Conflict",
    "type": "scenario",
    "weight": 1.2,
    "trait": "conflict_style",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": "married",
    "english": {
      "text": "Situation (Currently Married): When domestic routine or fatigue causes tension over division of household chores:"
    },
    "arabic": {
      "text": "موقف (للمتزوجين حالياً): عند تراكم الأعباء والضغوط اليومية والفتور في تقسيم المهام المنزلية:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "I initiate an open dialogue, reassess chore distributions calmly, and hire outside support if needed.",
        "arabic": "أبادر بحوار هادئ وودود لإعادة تنظيم المسؤوليات والاستعانة بمساعدة خارجية إن لزم.",
        "trait_scores": {
          "conflict_collaborating": 2,
          "communication_assertive": 1.5,
          "tki_collaborating": 2.5,
          "attachment_secure": 1.5,
          "gottman_repair_receptivity": 2,
          "hartman_blue": 1,
          "birkman_usual_assertive": 1.5,
          "firo_exp_ctrl": 1.2
        }
      },
      {
        "id": "opt2",
        "english": "I usually withdraw and do the tasks myself while suppressing mild frustration to avoid a fight.",
        "arabic": "أفضل الصمت وإنجاز المهام بنفسي مع كتمان العتب تجنباً لافتعال مشادة في المنزل.",
        "trait_scores": {
          "conflict_avoiding": 1.5,
          "communication_passive": 1.5,
          "tki_avoiding": 2.5,
          "hartman_white": 3.5,
          "gottman_stonewalling_risk": 1.8,
          "birkman_stress_withdrawing": 3.2,
          "disc_s": 1.2
        }
      },
      {
        "id": "opt3",
        "english": "I express immediate displeasure assertively to ensure standards are upheld without delay.",
        "arabic": "أعبر عن رفضي فوراً وبوضوح لضمان تصحيح الخلل فوراً وعدم تكرار الإهمال.",
        "trait_scores": {
          "conflict_competing": 1.5,
          "communication_assertive": 1,
          "tki_competing": 2.5,
          "disc_d": 1.5,
          "hartman_red": 2,
          "firo_exp_ctrl": 3.2,
          "gottman_defensiveness_risk": 1.5,
          "birkman_usual_assertive": 1.5
        }
      }
    ]
  },
  {
    "id": "q19_utb",
    "category": "Boundaries",
    "type": "scenario",
    "weight": 1.2,
    "trait": "emotional_intelligence",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": "used_to_be_married",
    "english": {
      "text": "Situation (Previously Married): How do you view past marital experiences when approaching a new relationship?"
    },
    "arabic": {
      "text": "موقف (لمن سبق له الزواج): كيف تتعامل مع تجاربك السابقة عند الإقبال على شريك حياة جديد؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "As closed lessons learned; I am fully healed, ready to love with a completely fresh slate.",
        "arabic": "كتجربة مكتملة واستفدت منها دروساً ناضجة؛ وأنا جاهز تماماً لبداية نقية خالية من الرواسب.",
        "trait_scores": {
          "emotional_regulation": 2,
          "trust_past": 2
        }
      },
      {
        "id": "opt2",
        "english": "I discuss past learnings objectively when relevant, while strictly respecting privacy and mutual trust.",
        "arabic": "أشارك الدروس والعبر بكل نضج وموضوعية عند الحاجة، مع حفظ الخصوصية وبناء الثقة.",
        "trait_scores": {
          "emotional_regulation": 1.5,
          "communication_assertive": 1.5,
          "birkman_usual_assertive": 1.5,
          "firo_exp_ctrl": 1.2
        }
      },
      {
        "id": "opt3",
        "english": "I still feel cautious and need extra time and emotional security to rebuild vulnerability.",
        "arabic": "أشعر بالحذر والحاجة للمزيد من الوقت والأمان العاطفي قبل فتح قلبي والاندماج الكامل.",
        "trait_scores": {
          "attachment_avoidant": 1.5,
          "trust_past": -1,
          "birkman_need_freedom": 2,
          "gottman_stonewalling_risk": 1.5,
          "firo_wnt_aff": -1
        }
      }
    ]
  },
  {
    "id": "q20",
    "category": "Communication",
    "type": "scenario",
    "weight": 1.2,
    "trait": "communication_style",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: When your partner says something that hurts your feelings in private, your natural response is:"
    },
    "arabic": {
      "text": "سيناريو: عندما يصدر من شريكك تصرف أو كلام يجرح مشاعرك على انفراد، ما هو تصرفك العفوي؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "State my hurt feelings calmly and clearly at the right moment using \"I feel\" statements.",
        "arabic": "أوضح ما شعرت به بهدوء ووضوح في الوقت المناسب معبراً عن مشاعري دون هجوم.",
        "trait_scores": {
          "communication_assertive": 2,
          "conflict_collaborating": 1.5,
          "tki_collaborating": 2.5,
          "attachment_secure": 1.5,
          "gottman_repair_receptivity": 2,
          "hartman_blue": 1,
          "birkman_usual_assertive": 1.5,
          "firo_exp_ctrl": 1.2
        }
      },
      {
        "id": "opt2",
        "english": "Become quiet, distant, or show subtle annoyance until they notice and ask what is wrong.",
        "arabic": "ألتزم الصمت والبرود أو ألمح بضيق غير مباشر حتى ينتبه بنفسه ويسأل عما بي.",
        "trait_scores": {
          "communication_passive_aggressive": 2,
          "attachment_anxious": 1,
          "gottman_criticism_risk": 2.7,
          "gottman_defensiveness_risk": 1.5,
          "birkman_stress_defensive": 1.8,
          "birkman_need_esteem": 2,
          "firo_wnt_aff": 2
        }
      },
      {
        "id": "opt3",
        "english": "Bury the feeling, tell myself it does not matter, and pretend everything is fine.",
        "arabic": "أتجاهل الأمر وأكتم المشاعر في داخلي وأتصرف كأن شيئاً لم يحدث لتفادي المشاكل.",
        "trait_scores": {
          "communication_passive": 2,
          "conflict_avoiding": 1.5,
          "tki_avoiding": 2.5,
          "hartman_white": 3.5,
          "gottman_stonewalling_risk": 1.8,
          "birkman_stress_withdrawing": 3.2,
          "disc_s": 1.2
        }
      }
    ]
  },
  {
    "id": "q21",
    "category": "Conflict",
    "type": "scenario",
    "weight": 1.2,
    "trait": "conflict_style",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: When an argument becomes intense and emotional, what is your most constructive instinct?"
    },
    "arabic": {
      "text": "سيناريو: عندما يحتد النقاش ويتصاعد التوتر العاطفي بينكما، ما هو السلوك الأقرب لطبيعتك؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Suggest a short 20-minute breather to calm down, with an explicit commitment to return and resolve it.",
        "arabic": "اقتراح استراحة قصيرة لتهدئة النفوس، مع التزام واضح ومؤكد بالعودة لحل الموضوع بهدوء.",
        "trait_scores": {
          "conflict_collaborating": 2,
          "emotional_regulation": 2,
          "tki_collaborating": 2.5,
          "attachment_secure": 1.5,
          "gottman_repair_receptivity": 2,
          "hartman_blue": 1
        }
      },
      {
        "id": "opt2",
        "english": "Insist on arguing it out immediately until one of us concedes, refusing to leave the room.",
        "arabic": "الإصرار على مواصلة النقاش الحاد حتى نصل لنتيجة أو يعترف الطرف الآخر بالخطأ فوراً.",
        "trait_scores": {
          "conflict_competing": 2,
          "emotional_regulation": -1,
          "tki_competing": 2.5,
          "disc_d": 1.5,
          "hartman_red": 2,
          "firo_exp_ctrl": 2,
          "gottman_defensiveness_risk": 1.5
        }
      },
      {
        "id": "opt3",
        "english": "Leave the conversation entirely and shut down for days, refusing to reopen the topic.",
        "arabic": "الانسحاب التام والصمت لأيام وتجنب فتح الموضوع مرة أخرى بأي شكل.",
        "trait_scores": {
          "conflict_avoiding": 2,
          "attachment_avoidant": 1.5,
          "tki_avoiding": 2.5,
          "hartman_white": 2,
          "gottman_stonewalling_risk": 3.3,
          "birkman_stress_withdrawing": 2,
          "birkman_need_freedom": 2,
          "firo_wnt_aff": -1
        }
      }
    ]
  },
  {
    "id": "q22",
    "category": "Children",
    "type": "scenario",
    "weight": 1.4,
    "trait": "family_values",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: Regarding intentions and timelines for having children in marriage:"
    },
    "arabic": {
      "text": "سيناريو: بخصوص الرغبة والتوقيت المستقبلي لإنجاب الأطفال وتكوين أسرة:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Having children is a central life goal and priority, preferably in the first 1-2 years of marriage.",
        "arabic": "إنجاب الأطفال وبناء أسرة هدف حياتي أساسي وأولوية، ويفضل في أول سنة أو سنتين من الزواج.",
        "trait_scores": {
          "children_desire": 2,
          "marriage_growth": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "I want children, but prefer waiting 2 to 4 years to first enjoy marital companionship and establish careers.",
        "arabic": "أرغب بالأطفال بالتأكيد، لكني أفضل التأني من 2 إلى 4 سنوات للاستقرار وبناء العلاقة أولاً.",
        "trait_scores": {
          "children_desire": 1,
          "future_stability": 1.5
        }
      },
      {
        "id": "opt3",
        "english": "I am undecided or strongly prefer a child-free lifestyle focusing on personal freedom and career.",
        "arabic": "غير متأكد أو أفضل حياة بدون أطفال للتركيز على الحرية الشخصية والتطور المهني.",
        "trait_scores": {
          "children_desire": -2,
          "boundaries_independence": 1.5
        }
      }
    ]
  },
  {
    "id": "q23",
    "category": "Religion",
    "type": "scenario",
    "weight": 1.3,
    "trait": "religious_alignment",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: What role should religious practice (daily prayer, Quran, spiritual environment) play in your household?"
    },
    "arabic": {
      "text": "سيناريو: ما هي المكانة التي ترغب أن تحتلها الممارسات الدينية (الصلاة في وقتها، القرآن، البيئة الإيمانية) في منزلك؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "A foundational, daily pillar; I expect mutual encouragement in religious duties and values.",
        "arabic": "ركيزة أساسية يومية؛ وأتطلع للتواصي والتكامل الروحي في أداء الفرائض والقيم في المنزل.",
        "trait_scores": {
          "religion_importance": 2,
          "religion_orthodoxy": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "Important personal spirituality, practiced with balance, moderation, and individual pacing.",
        "arabic": "أمر روحي مهم يمارس بتوازن واعتدال ومرونة، مع احترام مساحة كل طرف الخاصة.",
        "trait_scores": {
          "religion_importance": 1,
          "religion_orthodoxy": 0
        }
      },
      {
        "id": "opt3",
        "english": "A private personal matter that should not be a focal point of relationship evaluation.",
        "arabic": "شأن شخصي بحت بين العبد وربه، ولا أفضّل أن يكون محوراً لتقييم الشريك أو التدخل فيه.",
        "trait_scores": {
          "religion_importance": -1,
          "boundaries_independence": 1.5
        }
      }
    ]
  },
  {
    "id": "q24",
    "category": "Career",
    "type": "scenario",
    "weight": 1.1,
    "trait": "career_support",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: If your spouse receives an outstanding career promotion that requires demanding hours or relocation:"
    },
    "arabic": {
      "text": "سيناريو: إذا أتيحت لشريك حياتك فرصة وظيفية وترقية كبرى تتطلب ساعات عمل طويلة أو الانتقال لمدينة أخرى:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "I will fully support and champion their growth, adapting our domestic routines to enable their success.",
        "arabic": "سأدعمه بكل حماس وفخر، وسأتكيف مع الظروف الجديدة لمساعدته على تحقيق طموحه.",
        "trait_scores": {
          "career_support": 2,
          "marriage_commitment": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "Supportive, provided it is a temporary stage with strict boundaries to protect family well-being.",
        "arabic": "أدعم بشرط أن تكون مرحلة مؤقتة ومحددة بوقت حتى لا تتضرر استقرار الأسرة وجودة الحياة.",
        "trait_scores": {
          "career_support": 0.5,
          "worklife_balance": 1.5
        }
      },
      {
        "id": "opt3",
        "english": "I oppose it; family time, domestic presence, and local stability must always precede career ambition.",
        "arabic": "أعارض ذلك؛ فالاستقرار الأسري والتواجد اليومي في المنزل يجب أن يسبق أي طموح وظيفي.",
        "trait_scores": {
          "career_support": -1.5,
          "worklife_balance": 2
        }
      }
    ]
  },
  {
    "id": "q25",
    "category": "Trust",
    "type": "scenario",
    "weight": 1.2,
    "trait": "trust_index",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: Regarding digital privacy, phone passwords, and personal space in marriage:"
    },
    "arabic": {
      "text": "سيناريو: بخصوص الخصوصية الرقمية، وكلمات سر الهواتف، والمساحة الشخصية بين الزوجين:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Open device policy: We know each other’s passcodes with zero secrets, building complete trust.",
        "arabic": "شفافية مفتوحة: معرفة متبادلة لكلمات المرور دون أي أسرار، مما يرسخ الثقة المطلقة والاطمئنان.",
        "trait_scores": {
          "trust_privacy": -1,
          "trust_jealousy": -0.5
        }
      },
      {
        "id": "opt2",
        "english": "Mutual trust with healthy privacy: We respect each other’s phone privacy without snooping or suspicion.",
        "arabic": "ثقة متبادلة مع احترام الخصوصية: لكل طرف خصوصية هاتفه دون مراقبة أو فضول أو شكوك.",
        "trait_scores": {
          "trust_privacy": 1.5,
          "trust_jealousy": -1
        }
      },
      {
        "id": "opt3",
        "english": "I feel anxious if phones are password-protected or placed face-down, needing active transparency.",
        "arabic": "أشعر بالقلق والريبة إذا كان الهاتف مغلقاً برمز سري أو مقلوباً، وأحتاج لتطمين صريح ومباشر.",
        "trait_scores": {
          "trust_jealousy": 2,
          "attachment_anxious": 1.5,
          "birkman_need_esteem": 2,
          "firo_wnt_aff": 2,
          "gottman_criticism_risk": 1.2
        }
      }
    ]
  },
  {
    "id": "q26",
    "category": "Boundaries",
    "type": "scenario",
    "weight": 1.2,
    "trait": "family_boundaries",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: If an extended family member tries to interfere in your private marital dispute:"
    },
    "arabic": {
      "text": "سيناريو: في حال حاول أحد أفراد العائلة الممتدة (كالوالدين أو الإخوة) التدخل في خلاف زوجي خاص بينكما:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "We firmly close our door as a united team, resolving our issues completely in private with polite boundaries.",
        "arabic": "نغلق الباب كفريق واحد متماسك، ونحل أمورنا داخل بيتنا بكل أدب وحزم دون إقحام أحد.",
        "trait_scores": {
          "family_privacy": 2,
          "boundaries_independence": 2
        }
      },
      {
        "id": "opt2",
        "english": "I consult my parents for guidance when I feel stuck, as I value their wisdom and support.",
        "arabic": "أستشير والديّ للحصول على النصح والتوجيه عندما أشعر بالحيرة، لثقتي الكبيرة في حكمتهم.",
        "trait_scores": {
          "family_influence": 1.5,
          "family_privacy": -1
        }
      }
    ]
  },
  {
    "id": "q27",
    "category": "Emotional intelligence",
    "type": "scenario",
    "weight": 1.1,
    "trait": "emotional_intelligence",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: When your partner returns home exhausted and emotionally deflated after a rough day, your natural action is:"
    },
    "arabic": {
      "text": "سيناريو: عندما يعود شريكك إلى البيت مرهقاً ومحبطاً عاطفياً بعد يوم شاق، ما هو تصرفك التلقائي؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Listen empathetically, offer physical comfort/a warm drink, and let them vent without judging.",
        "arabic": "الاستماع بتعاطف، وتوفير أجواء راحة واحتضان واحتواء دون إلقاء اللوم أو تقديم نصائح سريعة.",
        "trait_scores": {
          "emotional_comforting": 2,
          "emotional_empathy": 2
        }
      },
      {
        "id": "opt2",
        "english": "Immediately offer actionable solutions and analyze how they can fix their workplace issue.",
        "arabic": "المبادرة بتقديم حلول منطقية وخطوات سريعة لكيفية حل مشكلته والتغلب على الموقف.",
        "trait_scores": {
          "mbti_t": 1.5,
          "emotional_empathy": 0.5,
          "disc_d": 1.5,
          "hartman_red": 1.5,
          "birkman_usual_assertive": 1.5,
          "firo_exp_ctrl": 1.2,
          "schwartz_achievement": 1.2
        }
      },
      {
        "id": "opt3",
        "english": "Give them complete space and stay in another room until their mood naturally improves.",
        "arabic": "إعطاؤه مساحة كاملة وتركه بمفرده في الغرفة حتى يتحسن مزاجه بمفرده.",
        "trait_scores": {
          "attachment_avoidant": 1,
          "emotional_comforting": -0.5,
          "birkman_need_freedom": 2,
          "gottman_stonewalling_risk": 1.5,
          "firo_wnt_aff": -1
        }
      }
    ]
  },
  {
    "id": "q28",
    "category": "Affection",
    "type": "scenario",
    "weight": 1.2,
    "trait": "love_language",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: You feel most deeply loved, valued, and emotionally safe with your partner when they:"
    },
    "arabic": {
      "text": "سيناريو: تشعر بأعلى درجات الحب والأمان والتقدير العاطفي من شريك حياتك عندما:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Express sincere verbal appreciation, compliments, and heartfelt gratitude (Words of Affirmation).",
        "arabic": "يعبر بكلمات المديح الصادقة والثناء والتعبير اللفظي الرقيق (كلمات التشجيع والإطراء).",
        "trait_scores": {
          "love_words": 3
        }
      },
      {
        "id": "opt2",
        "english": "Give undivided attention, engaging in deep eye contact and quality shared activities (Quality Time).",
        "arabic": "يمنحني وقتاً نوعياً واهتماماً كاملاً بعيداً عن الهواتف والمشتتات (قضاء الوقت المشترك).",
        "trait_scores": {
          "love_quality_time": 3
        }
      },
      {
        "id": "opt3",
        "english": "Proactively help with daily chores, errands, and tangible burdens to ease your day (Acts of Service).",
        "arabic": "يبادر بمساعدتي في المهام اليومية وقضاء حوائجي وتخفيف أعبائي (تقديم الخدمات والمساعدة).",
        "trait_scores": {
          "love_acts": 3
        }
      },
      {
        "id": "opt4",
        "english": "Surprise you with thoughtful, meaningful gifts that reflect their understanding of you (Receiving Gifts).",
        "arabic": "يفاجئني بهدايا مميزة ذات مغزى تعبر عن تذكره واهتمامه بي (تبادل الهدايا).",
        "trait_scores": {
          "love_gifts": 3
        }
      },
      {
        "id": "opt5",
        "english": "Offer warm physical affection, holding hands, hugging, and tender closeness (Physical Touch).",
        "arabic": "يعبر باللمسات الدافئة، والإمساك باليدين، والعناق والقرب الجسدي الحنون (التلامس الجسدي).",
        "trait_scores": {
          "love_touch": 3
        }
      }
    ]
  },
  {
    "id": "q29",
    "category": "Future planning",
    "type": "scenario",
    "weight": 1.1,
    "trait": "future_stability",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: What is your preferred philosophy toward long-term financial security versus lifestyle experiences?"
    },
    "arabic": {
      "text": "سيناريو: ما هي فلسفتك في الموازنة بين الأمان المالي طويل المدى والاستمتاع بتجارب الحياة الحالية؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Prioritize building substantial investments, emergency funds, and real estate security before luxury travel.",
        "arabic": "الأولوية لبناء مدخرات قوية، وصندوق طوارئ، وتملك عقار واستثمارات آمنة قبل السفر الفاخر.",
        "trait_scores": {
          "money_saver": 2,
          "future_stability": 2
        }
      },
      {
        "id": "opt2",
        "english": "A balanced split: allocating a fixed percentage for savings while enjoying regular vacations and fine experiences.",
        "arabic": "توازن ذكي: ادخار نسبة شهرية ثابتة مع تخصيص ميزانية واضحة للسفر والاستمتاع بالحياة.",
        "trait_scores": {
          "money_saver": 0.5,
          "future_stability": 1
        }
      },
      {
        "id": "opt3",
        "english": "Life is meant to be lived now; memorable travel and daily joys are more precious than hoarding wealth.",
        "arabic": "الحياة نعيشها مرة واحدة؛ وصناعة الذكريات والتجارب الممتعة أثمن من تجميع وتكديس الأموال.",
        "trait_scores": {
          "money_saver": -2,
          "openness": 1.5
        }
      }
    ]
  },
  {
    "id": "q30",
    "category": "Marriage",
    "type": "scenario",
    "weight": 1.3,
    "trait": "marriage_commitment",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: What is your primary psychological vision of marriage?"
    },
    "arabic": {
      "text": "سيناريو: ما هي رؤيتك النفسية العميقة لجوهر الزواج وبنائه؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "A sacred, unconditional lifelong commitment where two people grow and overcome all storms together.",
        "arabic": "ميثاق مقدس والتزام دائم مدى الحياة، يتكامل فيه الطرفان وينموان معاً ويتخطيان كل الصعاب.",
        "trait_scores": {
          "marriage_commitment": 2,
          "attachment_secure": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "A dynamic, mutually fulfilling partnership requiring continuous effort, romance, and shared satisfaction.",
        "arabic": "شراكة حية متجددة تقوم على التقدير المتبادل والرومانسية والشغف والعمل المستمر لإسعاد بعضنا.",
        "trait_scores": {
          "marriage_commitment": 1,
          "marriage_growth": 1.5
        }
      }
    ]
  },
  {
    "id": "q31",
    "category": "Conflict",
    "type": "likert",
    "weight": 1.1,
    "trait": "conflict_tolerance",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I can stay calm and emotionally grounded even when my partner is expressing strong irritation."
    },
    "arabic": {
      "text": "أستطيع الحفاظ على هدوئي واتزاني الانفعالي حتى عندما يعبر شريكي عن غضبه أو انزعاجه الشديد."
    }
  },
  {
    "id": "q32",
    "category": "Communication",
    "type": "likert",
    "weight": 1.1,
    "trait": "communication_active_listening",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "When listening to my partner, I focus on truly understanding their perspective rather than preparing my counter-argument."
    },
    "arabic": {
      "text": "عندما أستمع لشريكي، أركز على فهم وجهة نظره بصدق بدلاً من التفكير في الرد وتفنيد حجته."
    }
  },
  {
    "id": "q33",
    "category": "Conflict",
    "type": "likert",
    "weight": 1,
    "trait": "conflict_forgiveness",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Once an apology is made and an issue is settled, I let go completely and never bring up past grievances."
    },
    "arabic": {
      "text": "بمجرد الاعتذار وحل المشكلة، أسامح تماماً ولا أعيد فتح أخطاء الماضي في الخلافات اللاحقة."
    }
  },
  {
    "id": "q34",
    "category": "Communication",
    "type": "likert",
    "weight": 1,
    "trait": "communication_sharing",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I openly share my inner fears, self-doubts, and emotional vulnerabilities with my partner."
    },
    "arabic": {
      "text": "أشارك مخاوفي العميقة ونقاط ضعفي ومشاعري الحساسة بكل أريحية وشفافية مع شريكي."
    }
  },
  {
    "id": "q35",
    "category": "Conflict",
    "type": "likert",
    "weight": 1.1,
    "trait": "emotional_regulation",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I rarely raise my voice, use sarcastic mockery, or use insulting words during heated marital disputes."
    },
    "arabic": {
      "text": "من النادر جداً أن أرفع صوتي أو أستخدم السخرية أو الألفاظ الجارحة أثناء الخلافات الزوجية الحادة."
    }
  },
  {
    "id": "q36",
    "category": "Money",
    "type": "likert",
    "weight": 1.1,
    "trait": "money_saver_spender",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I consistently track my personal expenses and strictly adhere to a monthly savings budget."
    },
    "arabic": {
      "text": "أتابع نفقاتي ومشترياتي بانتظام وألتزم بصرامة بميزانية ادخار شهرية محددة."
    }
  },
  {
    "id": "q37",
    "category": "Lifestyle",
    "type": "likert",
    "weight": 1,
    "trait": "lifestyle_neatness",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "A clean, clutter-free, and tidy household environment is essential for my daily peace of mind."
    },
    "arabic": {
      "text": "نظافة المنزل والترتيب الدقيق للمقتنيات والهدوء المنزلي أمور أساسية لراحتي النفسية اليومية."
    }
  },
  {
    "id": "q38",
    "category": "Money",
    "type": "likert",
    "weight": 1,
    "trait": "financial_values",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Before making any non-essential purchase exceeding 1,000 SAR, I naturally consult my spouse."
    },
    "arabic": {
      "text": "قبل شراء أي غرض كمالي يتجاوز 1,000 ريال، أستشير شريك حياتي تلقائياً لمواءمة الميزانية."
    }
  },
  {
    "id": "q39",
    "category": "Lifestyle",
    "type": "likert",
    "weight": 1,
    "trait": "lifestyle_health",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Consistent physical fitness, clean nutrition, and regular exercise are non-negotiable daily priorities for me."
    },
    "arabic": {
      "text": "ممارسة الرياضة بانتظام والتغذية الصحية والحفاظ على اللياقة البدنية أولوية يومية لا أتهاون فيها."
    }
  },
  {
    "id": "q40",
    "category": "Lifestyle",
    "type": "likert",
    "weight": 1,
    "trait": "lifestyle_social_frequency",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I prefer spending most of my evenings enjoying domestic quietude at home rather than going out constantly."
    },
    "arabic": {
      "text": "أفضل قضاء معظم أمسياتي في هدوء المنزل بدلاً من الخروج والمقاهي والتجمعات بشكل مستمر."
    }
  },
  {
    "id": "q41",
    "category": "Family",
    "type": "likert",
    "weight": 1.2,
    "trait": "boundaries_family_privacy",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Private marital agreements, financial details, and disagreements should never be disclosed to in-laws or parents."
    },
    "arabic": {
      "text": "الأسرار الزوجية والتفاصيل المالية والخلافات الخاصة يجب ألا تُنقل إطلاقاً للأهل أو العائلة الممتدة."
    }
  },
  {
    "id": "q42",
    "category": "Family",
    "type": "likert",
    "weight": 1,
    "trait": "family_influence",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Maintaining close daily communication and strong emotional bonds with my parents is essential to my happiness."
    },
    "arabic": {
      "text": "التواصل اليومي القريب والبر الدائم بالوالدين والصلة العائلية الوثيقة أمر جوهري لسعادتي ورضا نفسي."
    }
  },
  {
    "id": "q43",
    "category": "Children",
    "type": "likert",
    "weight": 1.2,
    "trait": "family_values",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Parents must maintain strict consistency and clear rules when disciplining children, presenting a united front."
    },
    "arabic": {
      "text": "يجب على الوالدين الحفاظ على موقف موحد وقواعد واضحة ومنضبطة في تربية وتأديب الأبناء أمامهم."
    }
  },
  {
    "id": "q44",
    "category": "Children",
    "type": "likert",
    "weight": 1.1,
    "trait": "family_values",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Fostering emotional expression, curiosity, and warmth in children is more important than rigid academic pressure."
    },
    "arabic": {
      "text": "غرس الذكاء العاطفي والحوار الدافئ واستكشاف الشغف لدى الأبناء أهم من الضغط الأكاديمي الصارم."
    }
  },
  {
    "id": "q45",
    "category": "Children",
    "type": "likert",
    "weight": 1,
    "trait": "marriage_growth",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Even after having children, prioritizing romantic connection and couple time must remain our top relationship priority."
    },
    "arabic": {
      "text": "حتى بعد إنجاب الأطفال، يجب أن تظل العلاقة الرومانسية وتخصيص وقت خاص للزوجين أولوية قصوى."
    }
  },
  {
    "id": "q46",
    "category": "Family",
    "type": "likert",
    "weight": 1,
    "trait": "boundaries_independence",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "In-law visits should always be pre-arranged and agreed upon, rather than unannounced drop-ins."
    },
    "arabic": {
      "text": "زيارات الأقارب والأهل للمنزل يجب أن تكون بتنسيق وموعد مسبق ومريح للطرفين بدلاً من الزيارات المفاجئة."
    }
  },
  {
    "id": "q47",
    "category": "Religion",
    "type": "likert",
    "weight": 1.3,
    "trait": "religion_importance",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Faith, prayer on time, and Islamic moral principles guide all my major life decisions."
    },
    "arabic": {
      "text": "الالتزام الديني، والصلاة في وقتها، والمبادئ والقيم الأخلاقية هي البوصلة الأساسية لكافة قراراتي."
    }
  },
  {
    "id": "q48",
    "category": "Religion",
    "type": "likert",
    "weight": 1.1,
    "trait": "religion_orthodoxy",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I expect my partner to share an identical level of conservative religious practice in daily life."
    },
    "arabic": {
      "text": "أتوقع من شريك حياتي أن يشاركني نفس المستوى الدقيق من الالتزام والمحافظة في الممارسات اليومية."
    }
  },
  {
    "id": "q49",
    "category": "Religion",
    "type": "likert",
    "weight": 1,
    "trait": "religion_finances",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Regular charitable giving (Zakat and Sadaqah) is an obligatory monthly priority in my financial plans."
    },
    "arabic": {
      "text": "إخراج الزكاة والصدقات والعمل الخيري المستمر جزء أصيل ومقدس في تخطيطي المالي الشهري."
    }
  },
  {
    "id": "q50",
    "category": "Religion",
    "type": "likert",
    "weight": 1,
    "trait": "ideology_traditionalism",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Preserving authentic cultural heritage and traditional family rituals is vital in modern society."
    },
    "arabic": {
      "text": "التمسك بالعادات والتقاليد الأصيلة والطقوس العائلية التراثية أمر ضروري في عصر العولمة والانفتاح."
    }
  },
  {
    "id": "q51",
    "category": "Religion",
    "type": "likert",
    "weight": 1,
    "trait": "ideology_liberalism",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I embrace personal freedom, critical thinking, and progressive adaptability in societal conventions."
    },
    "arabic": {
      "text": "أشجع التفكير النقدي والتطور المستمر والمرونة والانفتاح على التغيرات الاجتماعية الإيجابية."
    }
  },
  {
    "id": "q52",
    "category": "Religion",
    "type": "likert",
    "weight": 1,
    "trait": "marriage_growth",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I view personal spiritual growth as a lifelong continuous journey rather than rigid conformity."
    },
    "arabic": {
      "text": "أرى النضج الروحي والإيماني رحلة تطور واعية ومستمرة طوال العمر وليست مجرد قوالب جامدة."
    }
  },
  {
    "id": "q53",
    "category": "Career",
    "type": "likert",
    "weight": 1.1,
    "trait": "career_ambition",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Reaching executive leadership and achieving high professional excellence are core components of my self-worth."
    },
    "arabic": {
      "text": "الوصول لمناصب قيادية وتحقيق التميز المهني الرفيع جزء رئيسي من طموحي وتقديري لذاتي."
    }
  },
  {
    "id": "q54",
    "category": "Career",
    "type": "likert",
    "weight": 1.1,
    "trait": "career_worklife_balance",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I strictly disconnect from work emails and calls during weekends and family evenings to preserve presence."
    },
    "arabic": {
      "text": "أفصل نفسي تماماً عن اتصالات ورسائل العمل أثناء عطلات نهاية الأسبوع والأمسيات الزوجية."
    }
  },
  {
    "id": "q55",
    "category": "Career",
    "type": "likert",
    "weight": 1,
    "trait": "career_prestige",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Social prestige, prestigious education, and influential career networks are important considerations for me."
    },
    "arabic": {
      "text": "المكانة الاجتماعية المرموقة والتعليم المتميز وشبكة العلاقات المؤثرة أمور مهمة ومحل تقدير عندي."
    }
  },
  {
    "id": "q56",
    "category": "Career",
    "type": "likert",
    "weight": 1,
    "trait": "career_support",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I am ready to willingly relocate to another city or country if my partner receives a transformative career opportunity."
    },
    "arabic": {
      "text": "أنا مستعد للانتقال لمدينة أو دولة أخرى إذا حصل شريكي على فرصة وظيفية أو دراسية نوعية واستثنائية."
    }
  },
  {
    "id": "q57",
    "category": "Career",
    "type": "likert",
    "weight": 1,
    "trait": "worklife_balance",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I believe domestic help (nannies, housekeepers) is essential to enable quality marital relaxation and career focus."
    },
    "arabic": {
      "text": "أرى أن الاستعانة بالخدمات المنزلية والمساعدة المدفوعة أمر ضروري لتوفير الراحة والوقت النوعي للزوجين."
    }
  },
  {
    "id": "q58",
    "category": "Career",
    "type": "likert",
    "weight": 1,
    "trait": "boundaries_independence",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Both partners should have dedicated personal hobbies and independent friend circles outside of the marriage."
    },
    "arabic": {
      "text": "من الصحي أن يمتلك كل شريك هوايات خاصة ودائرة أصدقاء مستقلة بجانب الحياة الزوجية المشتركة."
    }
  },
  {
    "id": "q59",
    "category": "Trust",
    "type": "likert",
    "weight": 1.1,
    "trait": "trust_jealousy",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I experience mild jealousy if my partner interacts friendly with opposite-gender colleagues or acquaintances."
    },
    "arabic": {
      "text": "أشعر بالغيرة الطبيعية إذا تفاعل شريكي بودية أو تبادل أحاديث اجتماعية مع زملاء العمل من الجنس الآخر."
    }
  },
  {
    "id": "q60",
    "category": "Affection",
    "type": "likert",
    "weight": 1.1,
    "trait": "affection_physical",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Frequent physical affection (holding hands, hugs, physical closeness) is vital for me to feel emotionally secure."
    },
    "arabic": {
      "text": "التعبير الجسدي الحنون (كالمسك باليد والعناق والقرب اليومي) أساسي لشعوري بالدفء والأمان العاطفي."
    }
  },
  {
    "id": "q61",
    "category": "Affection",
    "type": "likert",
    "weight": 1,
    "trait": "affection_words",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Hearing explicit verbal affirmations of love, respect, and attraction daily is deeply nourishing for me."
    },
    "arabic": {
      "text": "سماع عبارات الحب والإعجاب والتقدير اللفظي الصريح بشكل يومي يغذي روحي ويعزز سعادتي."
    }
  },
  {
    "id": "q62",
    "category": "Trust",
    "type": "likert",
    "weight": 1.1,
    "trait": "trust_past",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I find it easy to place deep, unconditional trust in a committed partner without fear of betrayal."
    },
    "arabic": {
      "text": "أجد من السهل منح الثقة العميقة والاطمئنان الكامل لشريك حياتي دون وساوس أو خوف من الخذلان."
    }
  },
  {
    "id": "q63",
    "category": "Emotional intelligence",
    "type": "likert",
    "weight": 1.1,
    "trait": "emotional_empathy",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I am highly sensitive to subtle shifts in my partner’s vocal tone, body language, and facial expressions."
    },
    "arabic": {
      "text": "أمتلك حساسية عالية لملاحظة التغيرات الدقيقة في نبرة صوت شريكي ولغة جسده وملامح وجهه."
    }
  },
  {
    "id": "q64",
    "category": "Marriage",
    "type": "likert",
    "weight": 1,
    "trait": "marriage_growth",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I am enthusiastic about reading relationship psychology books or attending marriage enrichment workshops together."
    },
    "arabic": {
      "text": "أرحب بحماس بقراءة كتب العلاقات الزوجية أو حضور ورش التوجيه الأسري لتطوير حياتنا سوياً."
    }
  },
  {
    "id": "q65",
    "category": "Future planning",
    "type": "likert",
    "weight": 1,
    "trait": "future_stability",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "I prefer having a clear 5-year life and financial roadmap rather than letting life unfold unplanned."
    },
    "arabic": {
      "text": "أفضل وجود خطة مستقبلية ومالية واضحة للسنوات الخمس القادمة بدلاً من ترك الأمور للظروف والصدف."
    }
  },
  {
    "id": "q66",
    "category": "Lifestyle",
    "type": "scenario",
    "weight": 1.1,
    "trait": "aesthetic_profile",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: Regarding your personal grooming, physical fitness, and aesthetic self-presentation:"
    },
    "arabic": {
      "text": "سيناريو: فيما يتعلق بالاهتمام بالمظهر الشخصي والهندام واللياقة البدنية لديك:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "High elegance: Daily dedicated fitness routine, meticulous grooming, and tailored styling.",
        "arabic": "عناية فائقة: تمارين رياضية منتظمة، واهتمام دقيق بالهندام والأناقة والعناية بالمظهر.",
        "trait_scores": {
          "lifestyle_health": 2,
          "conscientiousness": 1,
          "disc_c": 1.5,
          "hartman_red": 1,
          "birkman_need_structure": 1.5,
          "birkman_usual_structured": 1.5,
          "schwartz_security": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "Natural & balanced: Healthy, clean, presentable, and neat without excessive perfectionism.",
        "arabic": "طبيعي ومتوازن: مظهر صحي ومرتب وأنيق دون مبالغة أو هوس بالكماليات.",
        "trait_scores": {
          "lifestyle_health": 1
        }
      },
      {
        "id": "opt3",
        "english": "Casual & effortless: Practical comfort and simplicity always precede beauty routines.",
        "arabic": "عفوي وعملي: الأولوية للراحة والعملية والبساطة على حساب أي روتين تجميلي.",
        "trait_scores": {
          "lifestyle_health": 0
        }
      }
    ]
  },
  {
    "id": "q67",
    "category": "Lifestyle",
    "type": "scenario",
    "weight": 1.1,
    "trait": "aesthetic_profile",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: What are your expectations regarding your partner’s physical fitness, grooming, and body maintenance?"
    },
    "arabic": {
      "text": "سيناريو: ما هي توقعاتك ورغبتك بشأن لياقة شريك حياتك البدنية واهتمامه بهندامه وجاذبيته؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "High expectation: Physical fitness, active workout routines, and high grooming standards are vital for attraction.",
        "arabic": "توقع عالٍ: اللياقة البدنية والحرص على الرياضة والأناقة والجاذبية أمور ضرورية لاستمرار الانجذاب.",
        "trait_scores": {
          "lifestyle_health": 2
        }
      },
      {
        "id": "opt2",
        "english": "Moderate expectation: Good personal hygiene, neat presentation, and general health are sufficient.",
        "arabic": "توقع معتدل: النظافة الشخصية والمظهر المرتب والصحة العامة كافية تماماً ومرضية.",
        "trait_scores": {
          "lifestyle_health": 1
        }
      },
      {
        "id": "opt3",
        "english": "Low expectation: Intellectual and emotional connection are far more important than physical appearance.",
        "arabic": "توقع مرن: الجوهر الفكري والعاطفي والروحي أهم بكثير من التفاصيل الشكلية والمظهر الخارجي.",
        "trait_scores": {
          "lifestyle_health": 0
        }
      }
    ]
  },
  {
    "id": "q68",
    "category": "Lifestyle",
    "type": "scenario",
    "weight": 1,
    "trait": "aesthetic_profile",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: When choosing your daily wardrobe and public style presentation:"
    },
    "arabic": {
      "text": "سيناريو: عند اختيار أسلوبك في الأزياء والملابس والمظهر في المناسبات العامة:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Modern chic & fashionable: Refined designer choices, contemporary cuts, and trending accessories.",
        "arabic": "عصري وأنيق: اختيارات راقية تواكب الموضة الحديثة والأناقة المتجددة والألوان المتناسقة.",
        "trait_scores": {
          "openness": 1.5,
          "career_prestige": 1
        }
      },
      {
        "id": "opt2",
        "english": "Classic & conservative: Dignified, timeless traditional or formal attire with elegant modesty.",
        "arabic": "كلاسيكي ومحافظ: لباس وقور ومحتشم وأنيق يجمع بين الأصالة والهيبة والوقار.",
        "trait_scores": {
          "ideology_traditionalism": 1.5,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5
        }
      },
      {
        "id": "opt3",
        "english": "Simple & casual: Relaxed, comfortable clothes that prioritize practical ease over style statements.",
        "arabic": "بسيط ومريح: ملابس كاجوال مريحة وعملية تعطي الأولوية للراحة وسهولة الحركة.",
        "trait_scores": {
          "openness": 0
        }
      }
    ]
  },
  {
    "id": "q69",
    "category": "Lifestyle",
    "type": "scenario",
    "weight": 1,
    "trait": "aesthetic_profile",
    "importance": "medium",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: What style and fashion aesthetic do you most appreciate in your partner in public and social settings?"
    },
    "arabic": {
      "text": "سيناريو: ما هو الأسلوب والمظهر الذي تفضله في شريك حياتك في المناسبات والزيارات الاجتماعية؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Modern, well-dressed, and distinctly fashionable with eye-catching elegance.",
        "arabic": "مظهر عصري أنيق ومواكب للأزياء الراقية والاهتمام بالتفاصيل الجذابة.",
        "trait_scores": {
          "openness": 1.5
        }
      },
      {
        "id": "opt2",
        "english": "Dignified, classically elegant, and tastefully modest reflecting maturity.",
        "arabic": "مظهر وقور وكلاسيكي ومحتشم يعكس الرزانة والذوق الرفيع والهيبة.",
        "trait_scores": {
          "ideology_traditionalism": 1.5,
          "schwartz_tradition": 2.5,
          "schwartz_security": 1.5
        }
      },
      {
        "id": "opt3",
        "english": "Natural, unpretentious, and casual without caring about luxury brands.",
        "arabic": "مظهر عفوي وبسيط وطبيعي دون تكلف أو اهتمام بالماركات الاستعراضية.",
        "trait_scores": {
          "openness": 0
        }
      }
    ]
  },
  {
    "id": "q71",
    "category": "Personality",
    "type": "scenario",
    "weight": 1.5,
    "trait": "hartman_core_motive",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: If you could ensure your home environment guarantees one fundamental quality above all else, which would it be?"
    },
    "arabic": {
      "text": "سيناريو: إذا كان بإمكانك ضمان ميزة جوهرية واحدة في بيئة منزلك وحياتك الزوجية تفوق كل شيء، فماذا تختار؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "High ambition, tangible achievements, and an orderly, organized household where everyone excels.",
        "arabic": "طموح عالٍ، إنجازات ملموسة، ونظام منزلي متقن يسعى فيه الجميع للتميز والنجاح.",
        "trait_scores": {
          "hartman_red": 3.5,
          "disc_d": 2.5,
          "birkman_usual_assertive": 2,
          "birkman_need_structure": 2,
          "schwartz_achievement": 2.5,
          "firo_exp_ctrl": 2
        }
      },
      {
        "id": "opt2",
        "english": "Deep emotional closeness, heartfelt vulnerability, and feeling intensely loved, cherished, and understood.",
        "arabic": "قرب عاطفي عميق، ومصارحة من القلب، وشعور غامر بالحب والاهتمام والاحتواء المتبادل.",
        "trait_scores": {
          "hartman_blue": 3.5,
          "disc_s": 2,
          "birkman_need_empathy": 3,
          "firo_wnt_aff": 3,
          "attachment_secure": 2,
          "schwartz_benevolence": 2.5
        }
      },
      {
        "id": "opt3",
        "english": "Absolute peace, complete absence of conflict, no drama, and a serene, low-pressure sanctuary.",
        "arabic": "سلام مطلق، وخلو تام من الخلافات والمشاحنات، وهدوء وسكينة دون أي ضغوط نفسية.",
        "trait_scores": {
          "hartman_white": 3.5,
          "disc_s": 2.5,
          "birkman_need_freedom": 2.5,
          "tki_avoiding": 1.5,
          "firo_exp_ctrl": -1.5,
          "schwartz_security": 2
        }
      },
      {
        "id": "opt4",
        "english": "Laughter, spontaneous adventures, vibrant social energy, and keeping life exciting, playful, and fun.",
        "arabic": "ضحك ومرح، ومغامرات عفوية، وطاقة اجتماعية متجددة تجعل الحياة اليومية ممتعة ومليئة بالبهجة.",
        "trait_scores": {
          "hartman_yellow": 3.5,
          "disc_i": 3,
          "birkman_usual_social": 2.5,
          "firo_exp_inc": 2.5,
          "schwartz_hedonism": 3,
          "openness": 1.5
        }
      }
    ]
  },
  {
    "id": "q72",
    "category": "Conflict",
    "type": "scenario",
    "weight": 1.5,
    "trait": "birkman_needs_stress",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: When you are exhausted and your partner brings up an unexpected problem or task, what is your involuntary reaction?"
    },
    "arabic": {
      "text": "سيناريو: عندما تكون منهكاً تماماً ويطرح شريكك مشكلة غير متوقعة أو طلباً مفاجئاً، ما هو تصرفك العفوي؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "I shut down and go silent; I need them to give me space and not pressure me to talk immediately.",
        "arabic": "أنغلق وألتزم الصمت التام؛ أحتاج منه أن يترك لي مساحة هادئة وألا يضغط عليّ للحديث فوراً.",
        "trait_scores": {
          "birkman_stress_withdrawing": 3,
          "birkman_need_freedom": 2.5,
          "gottman_stonewalling_risk": 2.5,
          "hartman_white": 2,
          "attachment_avoidant": 2,
          "tki_avoiding": 2
        }
      },
      {
        "id": "opt2",
        "english": "I become blunt, impatient, and irritated; I demand they get straight to the point or handle it logically.",
        "arabic": "أصبح حاداً وقليل الصبر؛ وأطلب منه الدخول في صلب الموضوع مباشرة أو حله بمنطقية دون تضخيم.",
        "trait_scores": {
          "birkman_stress_demanding": 3,
          "birkman_usual_assertive": 2,
          "disc_d": 2.5,
          "hartman_red": 2.5,
          "gottman_criticism_risk": 2,
          "tki_competing": 2
        }
      },
      {
        "id": "opt3",
        "english": "I feel unappreciated and anxious; I need them to acknowledge my hard day before dumping issues on me.",
        "arabic": "أشعر بعدم التقدير والقلق؛ وأحتاج منه أن يعترف بتعبي ومجهودي أولاً قبل طرح أي هموم.",
        "trait_scores": {
          "birkman_need_esteem": 3,
          "birkman_stress_defensive": 2,
          "attachment_anxious": 2.5,
          "gottman_defensiveness_risk": 2,
          "hartman_blue": 2
        }
      },
      {
        "id": "opt4",
        "english": "I take a deep breath, validate their concern, and gently propose addressing it together over coffee after resting.",
        "arabic": "آخذ نفساً عميقاً، وأقدر اهتمامه، ثم أقترح بلطف أن نناقش الأمر معاً بهدوء بعد أخذ قسط من الراحة.",
        "trait_scores": {
          "attachment_secure": 3,
          "gottman_repair_receptivity": 3.5,
          "tki_collaborating": 3,
          "birkman_usual_supportive": 2.5,
          "agreeableness": 2
        }
      }
    ]
  },
  {
    "id": "q73",
    "category": "Decision making",
    "type": "scenario",
    "weight": 1.4,
    "trait": "firo_control_leadership",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: In managing major household decisions (relocation, major purchases, investments), what is your preferred dynamic?"
    },
    "arabic": {
      "text": "سيناريو: في القرارات الكبرى للأسرة (السكن، الشراء الكبير، الاستثمار)، ما هو النمط الذي تفضله بينكما؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "I prefer to take the lead in research and make the final call, keeping my partner informed and reassured.",
        "arabic": "أفضل أن أتولى زمام البحث واتخاذ القرار النهائي بنفسي، مع إطلاع شريكي وطمأنته.",
        "trait_scores": {
          "firo_exp_ctrl": 3,
          "firo_wnt_ctrl": -2,
          "disc_d": 2.5,
          "hartman_red": 2.5,
          "birkman_usual_assertive": 2.5
        }
      },
      {
        "id": "opt2",
        "english": "I want an absolute 50/50 consensus where neither of us moves forward without full mutual agreement.",
        "arabic": "أريد توافقاً تاماً بنسبة 50/50، بحيث لا يخطو أي منا خطوة دون موافقة ورضا كامل من الطرفين.",
        "trait_scores": {
          "firo_exp_ctrl": 1,
          "firo_wnt_ctrl": 1,
          "tki_collaborating": 3,
          "hartman_blue": 2,
          "decision_consensus": 3
        }
      },
      {
        "id": "opt3",
        "english": "I prefer my partner to take the main responsibility for major logistics, as long as they consult me with respect.",
        "arabic": "أفضل أن يتحمل شريكي المسؤولية الأساسية واللوجستية، طالما أنه يستشيرني باحترام ومودة.",
        "trait_scores": {
          "firo_wnt_ctrl": 3,
          "firo_exp_ctrl": -1.5,
          "disc_s": 2.5,
          "birkman_need_structure": 2,
          "hartman_white": 2
        }
      }
    ]
  },
  {
    "id": "q74",
    "category": "Communication",
    "type": "scenario",
    "weight": 1.5,
    "trait": "gottman_repair_attempt",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: During a tense disagreement, your partner smiles gently, touches your arm, or uses light humor to break the tension. How do you respond?"
    },
    "arabic": {
      "text": "سيناريو: أثناء نقاش محتدم ومشحون، ابتسم شريكك بلطف، أو لمس يدك، أو استخدم دعابة خفيفة لتلطيف الأجواء. كيف تتفاعل؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "I immediately soften, smile back, and welcome the de-escalation; human connection matters more than winning.",
        "arabic": "أهدأ فوراً وأبادله الابتسامة وأرحب بكسر التوتر؛ فدفء العلاقة أهم عندي بكثير من كسب النقاش.",
        "trait_scores": {
          "gottman_repair_receptivity": 4,
          "attachment_secure": 3,
          "hartman_blue": 2.5,
          "tki_collaborating": 2.5,
          "agreeableness": 2
        }
      },
      {
        "id": "opt2",
        "english": "I feel annoyed that they are not taking the issue seriously, pull away, and insist on finishing the argument.",
        "arabic": "أتضايق وأشعر أنه لا يأخذ الموضوع بجدية، وأبتعد عنه مصرّاً على حسم المشكلة أولاً.",
        "trait_scores": {
          "gottman_repair_receptivity": -3,
          "gottman_defensiveness_risk": 3,
          "gottman_criticism_risk": 2.5,
          "tki_competing": 2,
          "birkman_stress_demanding": 2
        }
      },
      {
        "id": "opt3",
        "english": "I feel conflicted and stay cautious; I accept the gesture politely but remain guarded until facts are resolved.",
        "arabic": "أشعر بالحيرة وأبقى حذراً؛ أقبل الإيماءة بتهذيب لكنني أظل متحفظاً حتى نتفق على التفاصيل.",
        "trait_scores": {
          "gottman_repair_receptivity": 1,
          "disc_c": 2.5,
          "hartman_white": 1.5,
          "attachment_anxious": 1.5
        }
      }
    ]
  },
  {
    "id": "q75",
    "category": "Lifestyle",
    "type": "scenario",
    "weight": 1.4,
    "trait": "schwartz_human_values",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: When balancing family traditions, social expectations, and personal individuality, your ultimate allegiance lies with:"
    },
    "arabic": {
      "text": "سيناريو: عند الموازنة بين تقاليد العائلة، وتوقعات المجتمع، واستقلاليتك الفردية، يكون ولاؤك الحاسم لـ:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Honoring our cultural heritage, familial customs, and time-tested social values above personal desires.",
        "arabic": "إكرام عادات العائلة والتقاليد العريقة والواجبات الاجتماعية فوق الرغبات الفردية الآنية.",
        "trait_scores": {
          "schwartz_tradition": 3.5,
          "schwartz_security": 2.5,
          "ideology_traditionalism": 3,
          "birkman_need_structure": 2
        }
      },
      {
        "id": "opt2",
        "english": "Protecting our nuclear couple bubble, personal freedom, and authenticity, even if it defies conventional expectations.",
        "arabic": "حماية استقلالية الأسرة الصغيرة وحريتها وخصوصيتها، حتى لو تعارضت مع التوقعات السائدة.",
        "trait_scores": {
          "schwartz_self_direction": 3.5,
          "birkman_need_freedom": 3,
          "ideology_liberalism": 3,
          "openness": 2
        }
      },
      {
        "id": "opt3",
        "english": "Serving and supporting our extended family and community with generosity and close interdependence.",
        "arabic": "خدمة العائلة الممتدة والمجتمع بعطاء وتكافل وترابط وثيق في كل الظروف.",
        "trait_scores": {
          "schwartz_benevolence": 3.5,
          "hartman_blue": 2.5,
          "firo_exp_inc": 2.5,
          "agreeableness": 2
        }
      }
    ]
  },
  {
    "id": "q76",
    "category": "Awareness & Consciousness",
    "type": "scenario",
    "weight": 1.5,
    "trait": "awareness_trigger_reflex",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: During a tense disagreement, your partner says something uncharacteristically sharp that stings. Your immediate internal reaction is to:"
    },
    "arabic": {
      "text": "سيناريو: أثناء نقاش متوتر، قال شريكك كلمة حادة وغير معتادة جرحت مشاعرك. ردة فعلك الداخلية التلقائية هي:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Pause, take a conscious breath, and realize their sharpness reflects their temporary inner distress rather than my worth.",
        "arabic": "التوقف وأخذ نفس واعٍ، وإدراك أن حدته تعكس ضيقه الداخلي اللحظي وليس تقليلاً من قيمتي الشخصية.",
        "trait_scores": {
          "hawkins_loc": 400,
          "hicks_level": 4,
          "gottman_repair_receptivity": 3,
          "attachment_secure": 3,
          "emotional_regulation": 2.5,
          "birkman_need_empathy": 2
        }
      },
      {
        "id": "opt2",
        "english": "Feel an immediate surge of irritation and counter-attack to defend myself and point out their unfairness.",
        "arabic": "الشعور بانزعاج فوري والرد بهجوم مضاد للدفاع عن نفسي وإثبات خطئه وتجاوزه.",
        "trait_scores": {
          "hawkins_loc": 150,
          "hicks_level": 10,
          "gottman_defensiveness_risk": 3.5,
          "tki_competing": 3,
          "attachment_anxious": 2,
          "birkman_stress_defensive": 3
        }
      },
      {
        "id": "opt3",
        "english": "Shut down completely, withdraw into cold silence, and mentally replay how unappreciated I feel.",
        "arabic": "الانغلاق التام، والانسحاب في صمت بارد، واجترار الأفكار حول عدم تقديري وظلم الموقف لي.",
        "trait_scores": {
          "hawkins_loc": 75,
          "hicks_level": 15,
          "gottman_stonewalling_risk": 3.5,
          "tki_avoiding": 3,
          "attachment_avoidant": 3,
          "birkman_stress_withdrawing": 3
        }
      }
    ]
  },
  {
    "id": "q77",
    "category": "Awareness & Consciousness",
    "type": "scenario",
    "weight": 1.5,
    "trait": "awareness_adversity_mindset",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: An unexpected financial or domestic crisis disrupts your joint plans. What is your dominant emotional set-point?"
    },
    "arabic": {
      "text": "سيناريو: حدثت أزمة مالية أو ظرف منزلي مفاجئ أربك كل خططكم المستقبلية. ما هي حالتك الشعورية التلقائية المهيمنة؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Grounded confidence that solutions exist, viewing the crisis as a shared challenge that will strengthen our teamwork.",
        "arabic": "ثقة راسخة بوجود الحلول، واعتبار الأزمة تحدياً مشتركاً سيعزز نضجنا وتكاتفنا وتكاملنا.",
        "trait_scores": {
          "hawkins_loc": 350,
          "hicks_level": 5,
          "conscientiousness": 2,
          "hartman_red": 1.5,
          "attachment_secure": 2.5,
          "future_stability": 2
        }
      },
      {
        "id": "opt2",
        "english": "Anxiety, repetitive catastrophic thoughts, and a pressing urge to control every single detail rigidly.",
        "arabic": "قلق مستمر، وتفكير في أسوأ السيناريوهات، ورغبة ملحة في السيطرة القهرية على كل التفاصيل.",
        "trait_scores": {
          "hawkins_loc": 100,
          "hicks_level": 14,
          "neuroticism": 3,
          "firo_exp_ctrl": 2.5,
          "attachment_anxious": 3,
          "birkman_stress_demanding": 2.5
        }
      },
      {
        "id": "opt3",
        "english": "A feeling of defeat and resentment, wondering why bad luck and unfair burdens always follow us.",
        "arabic": "شعور بالهزيمة والإحباط والتذمر، والتساؤل بحسرة لماذا تلاحقنا المتاعب دائماً.",
        "trait_scores": {
          "hawkins_loc": 50,
          "hicks_level": 16,
          "neuroticism": 3.5,
          "tki_avoiding": 2,
          "birkman_stress_withdrawing": 2
        }
      }
    ]
  },
  {
    "id": "q78",
    "category": "Awareness & Consciousness",
    "type": "scenario",
    "weight": 1.4,
    "trait": "awareness_partner_flaws",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: Your partner repeatedly struggles with an annoying personal habit (e.g., disorganization or tardiness). How do you genuinely perceive them?"
    },
    "arabic": {
      "text": "سيناريو: يعاني شريكك بشكل متكرر من عادة شخصية تزعجك (مثل الفوضوية أو التأخر). ما هي نظرتك الحقيقية العميقة له؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "With compassionate acceptance: they are human, their strengths vastly outweigh this habit, and I embrace them as a whole.",
        "arabic": "بصبر وقبول متفهم: هو إنسان لديه جوانب نقص كما لديّ، ومحاسنه تفوق هذا العيب، وأقبله ككل دون شروط.",
        "trait_scores": {
          "hawkins_loc": 500,
          "hicks_level": 1,
          "gottman_repair_receptivity": 3,
          "agreeableness": 3,
          "attachment_secure": 3,
          "hartman_blue": 2
        }
      },
      {
        "id": "opt2",
        "english": "With subtle superiority and exasperation: 'Why can't they just be disciplined and thoughtful like me?'",
        "arabic": "بنوع من الاستعلاء ونفاد الصبر: 'لماذا لا يكون منظماً ومسؤولاً مثلي؟ الأمر ليس معقداً!'",
        "trait_scores": {
          "hawkins_loc": 175,
          "hicks_level": 10,
          "gottman_contempt_risk": 4,
          "gottman_criticism_risk": 3.5,
          "hartman_red": 2,
          "birkman_stress_demanding": 3
        }
      },
      {
        "id": "opt3",
        "english": "As an unfixable burden that makes me resentful and hopeless about our domestic future.",
        "arabic": "كعبء دائم لا أمل في إصلاحه، مما يولد لدي استياءً مزمناً ويأساً من الراحة المشتركة.",
        "trait_scores": {
          "hawkins_loc": 75,
          "hicks_level": 12,
          "gottman_contempt_risk": 3,
          "gottman_stonewalling_risk": 2.5,
          "attachment_avoidant": 2.5
        }
      }
    ]
  },
  {
    "id": "q79",
    "category": "Awareness & Consciousness",
    "type": "scenario",
    "weight": 1.5,
    "trait": "awareness_recovery_velocity",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: After a resolved disagreement, how long does the negative emotional residue linger inside you?"
    },
    "arabic": {
      "text": "سيناريو: بعد انتهاء خلاف بينكما والاتفاق على حله، كم من الوقت يستمر الأثر العاطفي السلبي في داخلك؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "It dissolves very quickly; once understood, I easily return to warm affection, appreciation, and lightheartedness.",
        "arabic": "يتلاشى سريعاً جداً؛ بمجرد التفاهم أعود بسهولة إلى المودة والدفء والمرح الصادق دون ترسبات.",
        "trait_scores": {
          "hawkins_loc": 400,
          "hicks_level": 2,
          "emotional_regulation": 3.5,
          "agreeableness": 2.5,
          "gottman_repair_receptivity": 3,
          "hartman_yellow": 2
        }
      },
      {
        "id": "opt2",
        "english": "I need several hours or a full day to cool down, remaining cautious and slightly guarded before fully warming up.",
        "arabic": "أحتاج عدة ساعات أو يوماً كاملاً ليهدأ خاطري، وأبقى حذراً ومتحفظاً قبل أن أصفو تماماً.",
        "trait_scores": {
          "hawkins_loc": 250,
          "hicks_level": 7,
          "birkman_need_freedom": 2,
          "communication_reserved": 2,
          "attachment_avoidant": 1.5
        }
      },
      {
        "id": "opt3",
        "english": "It festers for days or weeks; I hold onto the grievance and mentally bring it up in subsequent disagreements.",
        "arabic": "يستمر لأيام أو أسابيع؛ أحتفظ بالعتب في صدري، وأستحضره في الخلافات التالية مع شعور بالمرارة.",
        "trait_scores": {
          "hawkins_loc": 125,
          "hicks_level": 18,
          "neuroticism": 3.5,
          "gottman_defensiveness_risk": 3.5,
          "attachment_anxious": 3,
          "birkman_stress_defensive": 3
        }
      }
    ]
  },
  {
    "id": "q80",
    "category": "Awareness & Consciousness",
    "type": "scenario",
    "weight": 1.5,
    "trait": "awareness_emotional_sovereignty",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: Your partner comes home in an irritable, foul mood. How does this affect your own inner equilibrium?"
    },
    "arabic": {
      "text": "سيناريو: عاد شريكك إلى المنزل وهو في مزاج عكر وسلبي ومنزعج. كيف يؤثر ذلك على توازنك النفسي الداخلي؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "I hold my calm space with quiet compassion; their bad mood does not dictate my peace, and I can be a loving anchor.",
        "arabic": "أحافظ على هدوئي بتعاطف رحب؛ مزاجه السيئ لا يسلبني سلامي الداخلي، وأكون سنداً مطمئناً له.",
        "trait_scores": {
          "hawkins_loc": 500,
          "hicks_level": 1,
          "emotional_regulation": 4,
          "attachment_secure": 3.5,
          "hartman_white": 2,
          "firo_exp_aff": 2
        }
      },
      {
        "id": "opt2",
        "english": "My mood immediately drops or spikes into irritation; I feel annoyed that they ruined the atmosphere.",
        "arabic": "يهبط مزاجي فوراً أو أنفعل؛ أشعر بالانزعاج لأنه أفسد أجواء المساء أو أشعر بتوتر وتأثر سريع.",
        "trait_scores": {
          "hawkins_loc": 150,
          "hicks_level": 11,
          "neuroticism": 3,
          "attachment_anxious": 3,
          "birkman_stress_demanding": 2.5
        }
      },
      {
        "id": "opt3",
        "english": "I feel anxious and walk on eggshells, fearing their negativity might turn into criticism directed at me.",
        "arabic": "أشعر بتهديد وقلق شديد، وأمشي بحذر مفرط خوفاً من أن ينقلب ضيقه إلى هجوم أو لوم ضدي.",
        "trait_scores": {
          "hawkins_loc": 100,
          "hicks_level": 21,
          "neuroticism": 3.5,
          "attachment_anxious": 3.5,
          "gottman_defensiveness_risk": 2
        }
      }
    ]
  },
  {
    "id": "q81",
    "category": "Awareness & Consciousness",
    "type": "scenario",
    "weight": 1.4,
    "trait": "awareness_feedback_receptivity",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: Your partner gently expresses that a specific habit of yours makes them feel neglected. Your instinct is to:"
    },
    "arabic": {
      "text": "سيناريو: عبّر شريكك بلطف عن أن تصرفاً معيناً منك يجعله يشعر بالإهمال أو البعد. ما هو تصرفك التلقائي؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Listen with genuine curiosity and empathy, validating their feelings and asking how we can grow closer.",
        "arabic": "الاستماع بفضول وقلب مفتوح، وتفهم مشاعره بصدق وسؤاله بمحبة: 'كيف يمكنني أن أجعلك تشعر باهتمامي؟'",
        "trait_scores": {
          "hawkins_loc": 350,
          "hicks_level": 3,
          "gottman_repair_receptivity": 4,
          "agreeableness": 3,
          "attachment_secure": 3,
          "communication_assertive": 2
        }
      },
      {
        "id": "opt2",
        "english": "Immediately recount all my sacrifices, accusing them of being ungrateful and demanding too much.",
        "arabic": "سرد كل تضحياتي وما أقدمه فوراً، واتهامه بنكران الجميل أو المبالغة والطلبات المرهقة.",
        "trait_scores": {
          "hawkins_loc": 175,
          "hicks_level": 15,
          "gottman_defensiveness_risk": 4,
          "tki_competing": 3,
          "birkman_stress_defensive": 3.5
        }
      },
      {
        "id": "opt3",
        "english": "Feel overwhelmed with self-blame or inadequacy, feeling like I can never satisfy their standards.",
        "arabic": "الشعور بانسحاق وجلد ذات أو ذنب خانق، والإحساس بأنني شريك مقصر لا يمكنني إرضاؤه أبداً.",
        "trait_scores": {
          "hawkins_loc": 30,
          "hicks_level": 21,
          "neuroticism": 4,
          "attachment_anxious": 3,
          "birkman_stress_withdrawing": 3
        }
      }
    ]
  },
  {
    "id": "q82",
    "category": "Awareness & Consciousness",
    "type": "scenario",
    "weight": 1.3,
    "trait": "awareness_evolution_mindset",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: Over years of marriage, individuals naturally evolve new interests and insights. How do you welcome this personal change?"
    },
    "arabic": {
      "text": "سيناريو: عبر سنوات الزواج، يتغير الإنسان وتتطور اهتماماته ونظرته للأمور. كيف تنظر إلى هذا التطور في شريكك؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "With excitement and wonder; a fulfilling relationship supports continuous mutual self-discovery and expansion.",
        "arabic": "بشغف وترحيب؛ فالعلاقة الصحية هي التي تدعم نمو كل طرف وتجدد اكتشافنا المستمر لبعضنا البعض.",
        "trait_scores": {
          "hawkins_loc": 400,
          "hicks_level": 2,
          "openness": 3.5,
          "schwartz_self_direction": 3,
          "marriage_growth": 3,
          "hartman_yellow": 2
        }
      },
      {
        "id": "opt2",
        "english": "With caution; I prefer life to remain predictable and worry that new interests might dilute our shared rituals.",
        "arabic": "بحذر وتحفظ؛ أفضّل بقاء الأمور كما عهدناها وأقلق من أن تؤثر اهتماماته الجديدة على استقرارنا.",
        "trait_scores": {
          "hawkins_loc": 200,
          "hicks_level": 8,
          "schwartz_security": 3,
          "schwartz_tradition": 2.5,
          "birkman_need_structure": 2.5
        }
      },
      {
        "id": "opt3",
        "english": "With resentment or suspicion, viewing personal shifts as a departure from our initial commitments.",
        "arabic": "بريبة واستياء، واعتبار أي تغيير تمرداً أو ابتعاداً أو خروجاً عن العهد والاتفاق الأصلي.",
        "trait_scores": {
          "hawkins_loc": 125,
          "hicks_level": 17,
          "firo_exp_ctrl": 3.5,
          "gottman_criticism_risk": 3,
          "birkman_stress_demanding": 3
        }
      }
    ]
  },
  {
    "id": "q83",
    "category": "Awareness & Consciousness",
    "type": "scenario",
    "weight": 1.5,
    "trait": "awareness_transcendent_forgiveness",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: When your partner makes a genuine mistake and sincerely apologizes, how does your heart process it?"
    },
    "arabic": {
      "text": "سيناريو: عندما يقع شريكك في خطأ غير مقصود ويعتذر عنه بصدق وحرقة، كيف يتعامل قلبك مع الأمر؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "I forgive fully and cleanly; the mistake is completely dissolved and never weaponized in future arguments.",
        "arabic": "أسامح بصفاء وتجاوز تام؛ يُمحى الخطأ ولا يُخزن كورقة ضغط أو تذكير مؤلم في الخلافات القادمة.",
        "trait_scores": {
          "hawkins_loc": 500,
          "hicks_level": 1,
          "gottman_repair_receptivity": 4,
          "agreeableness": 3.5,
          "attachment_secure": 3.5,
          "hartman_white": 2
        }
      },
      {
        "id": "opt2",
        "english": "I accept the apology verbally, but keep a cautious mental tally in my mind just in case it recurs.",
        "arabic": "أقبل الاعتذار ظاهرياً، لكن أحتفظ بسجل داخلي في ذاكرتي ليكون جاهزاً إذا تكرر الموقف.",
        "trait_scores": {
          "hawkins_loc": 175,
          "hicks_level": 13,
          "gottman_defensiveness_risk": 2.5,
          "firo_wnt_ctrl": 2.5,
          "birkman_stress_defensive": 2
        }
      },
      {
        "id": "opt3",
        "english": "I withhold warmth and intimacy to ensure they feel the weight of their error before granting peace.",
        "arabic": "أمنع عنه الود والمشاعر لفترة حتى يشعر بحجم خطئه وقسوة ما فعل قبل أن أرضى عنه.",
        "trait_scores": {
          "hawkins_loc": 150,
          "hicks_level": 18,
          "gottman_contempt_risk": 4,
          "tki_competing": 3.5,
          "firo_exp_ctrl": 3
        }
      }
    ]
  },
  {
    "id": "q84",
    "category": "Awareness & Consciousness",
    "type": "scenario",
    "weight": 1.4,
    "trait": "awareness_giving_vibration",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: In daily gestures of affection, care, and practical support, what is your underlying emotional energy?"
    },
    "arabic": {
      "text": "سيناريو: في تصرفات المودة اليومية والاهتمام وتقديم الرعاية والهدايا، ما هي طاقتك النفسية الحقيقية؟"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Pure joy of giving: enriching my partner's life is inherently rewarding and requires zero score-keeping.",
        "arabic": "بهجة العطاء الخالص: إدخال السرور على قلبه يغذيني ويسعدني تلقائياً دون انتظار مقابل أو تسجيل نقاط.",
        "trait_scores": {
          "hawkins_loc": 500,
          "hicks_level": 1,
          "schwartz_benevolence": 4,
          "agreeableness": 3.5,
          "hartman_blue": 3,
          "attachment_secure": 3
        }
      },
      {
        "id": "opt2",
        "english": "A balanced reciprocity: I give generously, but I consciously expect a comparable level of effort in return.",
        "arabic": "توازن شراكة عادل: أعطي بصدق، لكنني أتوقع بشكل واعٍ مقابلاً ومبادلة مماثلة تحفظ توازن العلاقة.",
        "trait_scores": {
          "hawkins_loc": 250,
          "hicks_level": 7,
          "schwartz_achievement": 2,
          "conscientiousness": 2,
          "hartman_red": 1.5,
          "firo_wnt_aff": 2
        }
      },
      {
        "id": "opt3",
        "english": "Anxious obligation or tactical leverage: I give so they won't leave or to establish a moral credit.",
        "arabic": "قلق أو ورقة ضغط: أقدم الاهتمام خوفاً من أن يبتعد عني، أو ليكون لي فضل ورصيد عنده عند الحاجة.",
        "trait_scores": {
          "hawkins_loc": 125,
          "hicks_level": 20,
          "attachment_anxious": 4,
          "neuroticism": 3,
          "firo_exp_ctrl": 2.5
        }
      }
    ]
  },
  {
    "id": "q85",
    "category": "Awareness & Consciousness",
    "type": "scenario",
    "weight": 1.6,
    "trait": "awareness_transmuting_conflict",
    "importance": "high",
    "gender_constraint": null,
    "marital_constraint": null,
    "english": {
      "text": "Scenario: When you realize in the heat of an argument that you are technically right, but pressing it will humiliate your partner, you:"
    },
    "arabic": {
      "text": "سيناريو: عندما تكتشف في خضم نقاش ساخن أنك على حق تماماً، لكن إثبات ذلك سيحرج شريكك ويكسر خاطره، فإنك:"
    },
    "options": [
      {
        "id": "opt1",
        "english": "Gently pivot toward connection and reassurance; protecting our emotional intimacy is infinitely more important than being right.",
        "arabic": "تحوّل دفة الحديث بهدوء نحو المودة والتفهم المشترك؛ فحماية الرابط العاطفي أثمن بكثير من نشوة الانتصار وإثبات الصواب.",
        "trait_scores": {
          "hawkins_loc": 500,
          "hicks_level": 1,
          "gottman_repair_receptivity": 4,
          "agreeableness": 4,
          "tki_collaborating": 3.5,
          "hartman_white": 2.5
        }
      },
      {
        "id": "opt2",
        "english": "State the facts calmly and dispassionately, allowing objective truth to speak for itself without emotional gloating.",
        "arabic": "توضح الحقائق بموضوعية وهدوء دون سخرية، مع التركيز على الدقة والمنطق المجرد.",
        "trait_scores": {
          "hawkins_loc": 400,
          "hicks_level": 6,
          "mbti_t": 3,
          "disc_c": 2.5,
          "tki_compromising": 2.5,
          "birkman_usual_structured": 2
        }
      },
      {
        "id": "opt3",
        "english": "Press your logical advantage and demand they concede, ensuring they acknowledge their misjudgment fully.",
        "arabic": "تضغط بقوة وتثبت خطأه بالحجة القاطعة، وتصر على اعترافه بالخطأ والتقصير قبل إغلاق الموضوع.",
        "trait_scores": {
          "hawkins_loc": 175,
          "hicks_level": 10,
          "gottman_contempt_risk": 3.5,
          "tki_competing": 4,
          "hartman_red": 3,
          "birkman_stress_demanding": 3
        }
      }
    ]
  }
];
