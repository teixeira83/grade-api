export default function createOneUser(uuid, bankId) {
  return ` 
  INSERT INTO public."User" (id,"name",email,"bankId",cellphone,cpf,status,"stageVerification","expiredPassword","blocked",created_by,last_updated_by,updated_at,created_at,removed) VALUES
  ('${uuid}','leonardo','leonardo.fc2@outlook.com','${bankId}','21987800109','41072214075',false,false,false,false,NULL,NULL,'2022-12-06 22:50:57.973','2022-12-06 22:50:57.973',false);
`
}
