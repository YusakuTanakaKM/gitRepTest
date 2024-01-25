import { PollyClient, StartSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";
// import { ListBucketsCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import express from "express";

// const s3Client = new S3Client({});
const pollyClient = new PollyClient();
const router = express.Router();
const bucketName = "km-sd04"

// GET /
// Express ルータ動作確認 
router.get("/", async function (req, res, next) {
  res.send("TTS API");
});

// POST /tts/save-to-s3
router.post("/save-to-s3", async function (req, res, next) {
  let text = req.body.text

  let params = {
    OutputFormat: "mp3",
    OutputS3BucketName: "km-sd04",
    Text: text,
    TextType: "text", // "ssml" || "text"
    VoiceId: "Takumi",
    SampleRate: "24000",
  };

  try {
    const result = await pollyClient.send(new StartSpeechSynthesisTaskCommand(params));
    console.log("Success, audio file added to " + params.OutputS3BucketName);
    console.log(result)
    res.send(result.SynthesisTask.OutputUri)
  } catch (err) {
    console.log("Error putting object", err);
    res.send(`ERROR: ${err}`);
  }
});

export { router as default };