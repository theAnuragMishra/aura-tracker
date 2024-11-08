import { createSupabaseClient } from "../utils/supabase";
import jwt from "jsonwebtoken";

export async function getStudentCourses(req: any, res: any) {
  const user = req.user;
  const id = user.id;

  // console.log(user);

  const token = jwt.sign({ id }, process.env.SUPABASE_JWT_SECRET!, {
    expiresIn: "10m",
  });
  const supabase = createSupabaseClient(token);

  const { data, error } = await supabase
    .from("enrollment")
    .select("course_id, courses!inner(course_name), profiles!inner(full_name)")
    .eq("profiles.id", id);
  if (error) {
    console.log(error);
    return res.status(500).send({ message: "internal server error" });
  }
  return res.json(data);
}

export async function getStudentAttendance(req: any, res: any) {
  const user = req.user;
  const id = user.id;
  const course_id = req.query.course_id;
  if (!course_id) {
    return res.status(400).send({ message: "course id is required" });
  }
  // console.log(user);

  const token = jwt.sign({ id }, process.env.SUPABASE_JWT_SECRET!, {
    expiresIn: "10m",
  });
  const supabase = createSupabaseClient(token);

  const { data, error } = await supabase
    .from("attendance")
    .select("date, status, enrollment!inner(course_id, student_id)")
    .eq("enrollment.student_id", id)
    .eq("enrollment.course_id", course_id);

  if (error) {
    console.log(error);
    return res.status(500).send({ message: "internal server error" });
  }

  return res.json(data);
}

export async function getStudentModules(req: any, res: any) {
  const user = req.user;
  const id = user.id;
  const course_id = req.query.course_id;
  if (!course_id) {
    return res.status(400).send({ message: "course id is required" });
  }
  // console.log(user);

  const token = jwt.sign({ id }, process.env.SUPABASE_JWT_SECRET!, {
    expiresIn: "10m",
  });
  const supabase = createSupabaseClient(token);

  const { data, error } = await supabase
    .from("modules")
    .select("*")
    .eq("course_id", course_id);

  if (error) {
    console.error(error);
    return res.status(500).send({ message: "couldn't get modules" });
  }
  return res.status(200).json(data);
}

export async function getModuleDetails(req: any, res: any) {
  const user = req.user;
  const id = user.id;
  const module_id = req.query.module_id;
  if (!module_id) {
    return res.status(400).send({ message: "module id is required" });
  }
  // console.log(user);

  const token = jwt.sign({ id }, process.env.SUPABASE_JWT_SECRET!, {
    expiresIn: "10m",
  });
  const supabase = createSupabaseClient(token);

  const { data, error } = await supabase
    .from("modules")
    .select("*, questions!inner(*, options!options_question_id_fkey(*))")
    .eq("id", module_id);

  if (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "server error while fetching module data" });
  }
  // console.log(data[0].questions[0].options);
  return res.status(200).json(data);
}

export async function evaluate(req: any, res: any) {
  // console.log(req.body);
  const answers = req.body.answers;
  const module_id = req.body.module_id;
  if (!answers || !module_id) {
    return res.status(400).send({ message: "incorrect data format" });
  }
  const user = req.user;
  const id = user.id;
  const token = jwt.sign({ id }, process.env.SUPABASE_JWT_SECRET!, {
    expiresIn: "10m",
  });
  const supabase = createSupabaseClient(token);

  const { data: auraData, error: auraError } = await supabase
    .from("modules")
    .select("aura_change")
    .eq("id", module_id);

  if (auraError) {
    // console.error(auraError);
    return res.status(500).send({ message: "internal error" });
  }
  // console.log(auraData);

  const aura = auraData[0].aura_change;

  const auraPerQuestion = aura / answers.length;

  const { data, error } = await supabase.rpc("evaluate_answers", { answers });

  if (error) {
    console.error(error);
    return res.status(500).send({ message: "internal error" });
  }

  const aura_change = auraPerQuestion * data;
  const correct_answers = data;

  const finalAnswers = await Promise.all(
    answers.map(async (item: any) => {
      const { data: answerData, error: answerError } = await supabase
        .from("questions")
        .select("*")
        .eq("id", item.question_id);

      if (answerError) {
        console.error(answerError);
        return null;
      }

      return answerData![0].correct_option;
    })
  );

  const finalData = {
    aura_change,
    correct_answers,
    finalAnswers,
  };

  return res.status(200).json(finalData);
}
